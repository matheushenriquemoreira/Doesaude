import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: 'tb_postagem' })
export class Postagem {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    @ApiProperty()
    imagem: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    @ApiProperty()
    titulo: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({ nullable: false, length: 255 })
    @ApiProperty()
    descricao: string

    @ApiProperty({ type: () => Categoria })
    @JoinColumn({name: 'categoria_id'})
    @ManyToOne(() => Categoria, (categoria) => categoria.postagem, {
        onDelete: 'CASCADE'
    })
    categoria: Categoria

    @ApiProperty({ type: () => Usuario })
    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.postagens,{onDelete: 'CASCADE'})
    usuario: Usuario
    
}