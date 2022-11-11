import { DeleteResult, ILike, Repository } from 'typeorm';
import { Usuario } from './../entities/usuario.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ) { }

    //MÉTODOS
    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            relations: {
                postagens: true,
                endereco: true
            }
        })
    }

    async findById(id: number): Promise<Usuario> {
        let categoria = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                postagens: true,
                endereco: true
            }
        })

        if (!categoria)
            throw new HttpException(`USUÁRIO NÃO ENCONTRADO`, HttpStatus.NOT_FOUND)
        return categoria
    }


    async findByNome(nome: string): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                postagens: true,
                endereco: true
            }
        })
    }

    async findByCpf(cpf: string): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            where: {
                cpf: ILike(`%${cpf}%`)
            },
            relations: {
                postagens: true,
                endereco: true
            }
        })
    }

    async create(usuario: Usuario): Promise<Usuario> {
        return this.usuarioRepository.save(usuario)
    }

    async update(usuario: Usuario): Promise<Usuario> {

        let usuarioUpdate = await this.findById(usuario.id)

        if (!usuarioUpdate || !usuario.id)
            throw new HttpException('USUÁRIO NÃO ENCONTRADO', HttpStatus.NOT_FOUND)
        return this.usuarioRepository.save(usuario)
    }


    async delete(id: number): Promise<DeleteResult> {
        let usuarioDelete = await this.findById(id)

        if (!usuarioDelete)
            throw new HttpException('USUÁRIO NÃO FOI ENCONTRADO', HttpStatus.NOT_FOUND)
        return this.usuarioRepository.delete(id)
    }


}