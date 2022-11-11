import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Endereco } from "../entities/endereco.entity";

@Injectable()
export class EnderecoService {

    constructor(
        @InjectRepository(Endereco)
        private enderecoRepository: Repository<Endereco>

    ) { }

    async findAll(): Promise<Endereco[]> {

        return this.enderecoRepository.find({
            relations: {
                usuario: true
            }
        })
    }


    async findById(id: number): Promise<Endereco> {
        let endereco = await this.enderecoRepository.findOne({
            where: {
                id
            },
            relations: {
                usuario: true
            }
        })
        // NESSA PARTE DEBAIXO
        if (!endereco)
            throw new HttpException('Endereco não encontrada', HttpStatus.NOT_FOUND)

        return endereco
    }


    async findByCep(cep: string): Promise<Endereco[]> {
        return this.enderecoRepository.find({
            where: {
                cep: ILike(`%${cep}%`)
            },
            relations: {
                usuario: true
            }
        })
    }

    async create(endereco: Endereco): Promise<Endereco> {
        return this.enderecoRepository.save(endereco)
    }

    async update(endereco: Endereco): Promise<Endereco> {
        let enderecoUpdate = await this.findById(endereco.id)

        if (!enderecoUpdate || !endereco.id)
            throw new HttpException('Endereco não encontrado', HttpStatus.NOT_FOUND)
        return this.enderecoRepository.save(endereco)
    }

    async delete(id: number): Promise<DeleteResult> {
        let enderecoDelete = await this.findById(id)

        if (!enderecoDelete)
            throw new HttpException('Endereco não encontrado', HttpStatus.NOT_FOUND)

        return this.enderecoRepository.delete(id)
    }

}