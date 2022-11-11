import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Endereco } from "../entities/endereco.entity";
import { EnderecoService } from "../services/endereco.service";

@ApiTags('Endereco')
@Controller('/endereco')
export class EnderecoController{

    constructor(private readonly service: EnderecoService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise <Endereco[]>{
        return this.service.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise <Endereco>{
        return this.service.findById(id)
    }

    @Get('/cep/:cep')
    @HttpCode(HttpStatus.OK)
    findByTipo(@Param('tipo') cep: string): Promise <Endereco[]>{
        return this.service.findByCep(cep)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() endereco: Endereco): Promise <Endereco>{
        return this.service.create(endereco)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() endereco: Endereco): Promise <Endereco>{
        return this.service.update(endereco)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.service.delete(id)
    }
}