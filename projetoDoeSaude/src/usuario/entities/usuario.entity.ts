import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Endereco } from "../../endereco/entities/endereco.entity";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name:'tb_usuario'})
export class Usuario {
    @PrimaryColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(100)
    @Column({ nullable: false, length: 100 })
    email: string

    @IsNotEmpty()
    @MaxLength(150)
    @Column({ nullable: false, length: 150 })
    nome: string

    @IsNotEmpty()
    @MaxLength(11)
    @Column({ nullable: false, length: 11 })
    cpf: string

    @MaxLength(14)
    @Column({ nullable: true, length: 14 })
    telefone: string

    @MaxLength(50)
    @IsNotEmpty()
    @Column({ nullable: false, length: 50 })
    senha: string

    @IsNotEmpty()
    @Column({ nullable: false, type: "date"})
    dt_nasc: Date
    
    @ApiProperty({type: () => Postagem})
    @OneToMany(() => Postagem, (postagem: Postagem) => postagem.usuario)
    postagens: Postagem[]; 


    @ApiProperty({ type: () => Endereco })
    @ManyToOne(type => Endereco, endereco => endereco.usuario, {
        onDelete: 'CASCADE'
    })
    endereco: Endereco

    
}


