import { DataTypes, Model } from 'sequelize';
import sequelize from '../util/database';

interface UsuarioAttributes {
    cpf: string;
    senha: string;
    nome: string;
    esta_oferecendo_carona: boolean;
    reputacao?: number;
}

class Usuario extends Model<UsuarioAttributes> implements UsuarioAttributes {
    public id!: number;
    public login!: string;
    public cpf!: string;
    public senha!: string;
    public nome!: string;
    public esta_oferecendo_carona!: boolean;
    public reputacao?: number;

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
        esta_oferecendo_carona: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        reputacao: {
            type: DataTypes.INTEGER,
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
    placa: string;
    marca?: string;
    modelo?: string;
    cor?: string;
}

class Veiculo extends Model<VeiculoAttributes> implements VeiculoAttributes {
    public id!: number;
    public placa!: string;
    public marca?: string;
    public modelo?: string;
    public cor?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Veiculo.init(
    {
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
    },
    {
        sequelize,
        tableName: 'VEICULO',
        timestamps: false,
    }
); 
export { Veiculo };

interface CaronaAtualAttributes {
    local_de_partida: string;
    destino: string;
    data: Date;
    horario_de_partida: Date;
    horario_de_retorno: Date;
    qt_de_passageiros: number;
    aceita_automaticamente: boolean;
    em_progresso: boolean;
    raio_de_aceitacao_em_km: number;
}

class CaronaAtual extends Model<CaronaAtualAttributes> implements CaronaAtualAttributes {
    public id_carona_atual!: number;
    public id_usuario!: number;
    public local_de_partida!: string;
    public destino!: string;
    public data!: Date;
    public horario_de_partida!: Date;
    public horario_de_retorno!: Date;
    public qt_de_passageiros!: number;
    public aceita_automaticamente!: boolean;
    public em_progresso!: boolean;
    public raio_de_aceitacao_em_km!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CaronaAtual.init(
    {
        local_de_partida: {
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
        em_progresso: {
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
        tableName: 'CARONAS_ATUAIS',
        timestamps: false,
    }
);

CaronaAtual.belongsTo(Usuario, { foreignKey: 'id_usuario' });
export { CaronaAtual };

interface CaronaPassadaAttributes {
    local_de_partida: string;
    destino: string;
    data: Date;
    qt_de_passageiros: number;
}

class CaronaPassada extends Model<CaronaPassadaAttributes> implements CaronaPassadaAttributes {
    public id_carona_passada!: number;
    public id_usuario!: number;
    public local_de_partida!: string;
    public destino!: string;
    public data!: Date;
    public qt_de_passageiros!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CaronaPassada.init(
    {
        local_de_partida: {
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
        qt_de_passageiros: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'CARONAS_PASSADAS',
        timestamps: false,
    }
);

CaronaPassada.belongsTo(Usuario, { foreignKey: 'id_usuario' });
export { CaronaPassada };

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
        tableName: 'AVALIACOES',
        timestamps: false,
    }
);

Avaliacao.belongsTo(Usuario, { foreignKey: 'id_usuario_avaliador' });
Avaliacao.belongsTo(Usuario, { foreignKey: 'id_usuario_avaliado' });
Avaliacao.belongsTo(CaronaAtual, { foreignKey: 'id_da_carona' });
export { Avaliacao };