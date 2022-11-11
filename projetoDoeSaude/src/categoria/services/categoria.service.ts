import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService{

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository <Categoria>

    ){}

    async findAll(): Promise <Categoria[]>{
        return this.categoriaRepository.find({
            relations: {
                postagem: true
            }
        })
        
    }

    async findById(id: number): Promise <Categoria>{
        let categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        })
        if(!categoria)
        throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)

        return categoria
    }
    
    async findByTipo(tipo: string): Promise <Categoria[]>{
        return this.categoriaRepository.find({
            where: {
                tipo: ILike (`%${tipo}%`)
            }, relations: {
                postagem: true
            }
        })
    }

    async create(categoria: Categoria): Promise <Categoria>{
        return this.categoriaRepository.save(categoria)
    }

    async update(categoria: Categoria): Promise <Categoria>{
        let categoriaUpdate = await this.findById(categoria.id)

        if(!categoriaUpdate || !categoria.id)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)
        return this.categoriaRepository.save(categoria)
    }

    async delete(id: number): Promise <DeleteResult>{
        let categoriaDelete = await this.findById(id)

        if(!categoriaDelete)
        throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)

        return this.categoriaRepository.delete(id)
    }

}