import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService{

    constructor(

        @InjectRepository(Postagem)
        private postagemRepository: Repository <Postagem>

    ){}
    // Buscar todos itens dentro de postagem
    async findAll(): Promise <Postagem[]>  {
        return this.postagemRepository.find({
            relations: {
                categoria: true,              
                usuario: true
            }
        })
    }
    // Buscar item de acordo com o id que o usuario passar
    async findById(id: number): Promise<Postagem> {
        let postagem = await this.postagemRepository.findOne ({
            where: {
                id
            },relations: {
                usuario: true, 
                categoria: true
            } 
        })
        if(!postagem)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)
        return postagem
    }
    // Busca todos itens dentro da pasta de postagem/titulo -> "Titulo a ser encontrado"
    async findByTitulo(titulo: string): Promise <Postagem[]>{
        return this.postagemRepository.find({
            where: {
                titulo: ILike (`%${titulo}%`)
            },relations: {
                usuario: true, 
                categoria: true              
            }
        })
    }
    //  Busca todos itens dentro da pasta de postagem/descricao -> "Descrição do item"
    async findByDescricao(descricao: string): Promise <Postagem[]>{
        return this.postagemRepository.find({
            where: {
                descricao: ILike (`%${descricao}%`)
            },relations: {
                usuario: true, 
                categoria: true
            }
        })
    }
    // Criar uma postagem
    async create(postagem: Postagem): Promise <Postagem>{
        return this.postagemRepository.save(postagem)
    }
    // Alterar uma postagem
    async update(postagem: Postagem): Promise<Postagem>{
        let postagemUpdate = await this.findById(postagem.id)

        if(!postagemUpdate || postagem.id!)
        throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)

        return this.postagemRepository.save(postagem)
    }
    // Deletar postagem
    async delete(id: number): Promise<DeleteResult>{
        let postagemDelete = await this.findById(id)

        if(!postagemDelete)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)
        return this.postagemRepository.delete(id)
    }
 

    


}