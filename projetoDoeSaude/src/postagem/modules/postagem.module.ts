import { TypeOrmModule } from "@nestjs/typeorm";
import { Type } from "class-transformer";
import { Module } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../service/postagem.service";
import { PostagemController } from "../controller/postagem.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem])],
    providers: [PostagemService],
    controllers: [PostagemController],
    exports: [TypeOrmModule]
})

export class PostagemModule{}