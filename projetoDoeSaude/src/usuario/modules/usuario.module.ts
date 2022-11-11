import { UsuarioService } from './../service/usuario.service';
import { Usuario } from './../entities/usuario.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController } from '../controller/usuario.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [TypeOrmModule]
})
export class UsuarioModule{}