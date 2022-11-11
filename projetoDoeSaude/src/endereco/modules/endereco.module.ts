import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnderecoController } from "../controllers/endereco.controller";
import { Endereco } from "../entities/endereco.entity";
import { EnderecoService } from "../services/endereco.service";

@Module({

    imports:[TypeOrmModule.forFeature([Endereco])],
    providers: [EnderecoService],
    controllers: [EnderecoController],
    exports: [TypeOrmModule]
})
export class EnderecoModule{}