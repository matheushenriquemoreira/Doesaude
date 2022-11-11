import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../service/postagem.service";

@ApiTags('Postagem')
@Controller('/postagem')
export class PostagemController {

    constructor(private readonly service: PostagemService) {}
    // Buscar todos itens dentro de postagem
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise <Postagem[]>{
        return this.service.findAll()
    }
    // Buscar item de acordo com o id que o usuario passar
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem>{
        return this.service.findById(id)
    }
    // Busca todos itens dentro da pasta de postagem/titulo -> "Titulo a ser encontrado"
    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param ('titulo') titulo: string): Promise<Postagem[]>{
        return this.service.findByTitulo(titulo)
    }
    //  Busca todos itens dentro da pasta de postagem/descricao -> "Descrição do item"
    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    findByDescricao(@Param ('descricao') descricao: string): Promise<Postagem[]>{
        return this.service.findByDescricao(descricao)
    }
    // Criar uma postagem
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem>{
        return this.service.create(postagem)
    }
    // Alterar uma postagem
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.service.update(postagem)
    }
    // Deletar postagem
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.service.delete(id)
    }
}

