import { DataTypes, Model } from 'sequelize';
import sequelize from '../util/database';

interface UsuarioAttributes {
    cpf: string;
    senha: string;
    nome: string;
}

class Usuario extends Model<UsuarioAttributes> implements UsuarioAttributes {
    public id!: number;
    public cpf!: string;
    public senha!: string;
    public nome!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Usuario.init(
    {
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'USUARIO',
        timestamps: false,
    }
); 
export { Usuario };

interface VeiculoAttributes {
    id?: number;
    placa: string;
    marca?: string;
    modelo?: string;
    cor?: string;
    id_usuario: number;
}

class Veiculo extends Model<VeiculoAttributes> implements VeiculoAttributes {
    public id!: number;
    public placa!: string;
    public marca?: string;
    public modelo?: string;
    public cor?: string;
    public id_usuario!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Veiculo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        placa: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        marca: {
            type: DataTypes.STRING,
        },
        modelo: {
            type: DataTypes.STRING,
        },
        cor: {
            type: DataTypes.STRING,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'VEICULO',
        timestamps: false,
    }
); 

Veiculo.belongsTo(Usuario, { foreignKey: 'id_usuario' });
export { Veiculo };

interface CaronaAttributes {
    id_carona_atual?: number;
    id_usuario: number;
    origem: string;
    destino: string;
    data: Date;
    horario_de_partida: Date;
    horario_de_retorno: Date;
    qt_de_passageiros: number;
    aceita_automaticamente: boolean;
    raio_de_aceitacao_em_km: number;
}

class Carona extends Model<CaronaAttributes> implements CaronaAttributes {
    public id_carona_atual!: number;
    public id_usuario!: number;
    public origem!: string;
    public destino!: string;
    public data!: Date;
    public horario_de_partida!: Date;
    public horario_de_retorno!: Date;
    public qt_de_passageiros!: number;
    public aceita_automaticamente!: boolean;
    public raio_de_aceitacao_em_km!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Carona.init(
    {
        id_carona_atual: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        origem: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destino: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        horario_de_partida: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        horario_de_retorno: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        qt_de_passageiros: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        aceita_automaticamente: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        raio_de_aceitacao_em_km: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'CARONA',
        timestamps: false,
    }
);

Carona.belongsTo(Usuario, { foreignKey: 'id_usuario' });
export { Carona };

interface AvaliacaoAttributes {
    qualidade_da_carona: number;
}

class Avaliacao extends Model<AvaliacaoAttributes> implements AvaliacaoAttributes {
    public id_avaliacao!: number;
    public id_usuario_avaliador!: number;
    public id_usuario_avaliado!: number;
    public id_da_carona!: number;
    public qualidade_da_carona!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Avaliacao.init(
    {
        qualidade_da_carona: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'AVALIACAO',
        timestamps: false,
    }
);

Avaliacao.belongsTo(Usuario, { foreignKey: 'id_usuario_avaliador' });
Avaliacao.belongsTo(Usuario, { foreignKey: 'id_usuario_avaliado' });
Avaliacao.belongsTo(Carona, { foreignKey: 'id_da_carona' });
export { Avaliacao };
