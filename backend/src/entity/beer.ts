import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Beer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'beer_name', type: 'varchar' })
    marque!: string;

    @Column('decimal', { precision: 5, scale: 2 })
    price!: number;

    @Column()
    type!: string;
}
