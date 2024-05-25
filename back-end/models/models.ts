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

interface CaronaAttributes {
    id_carona_atual?: number;
    id_usuario: number;
    id_veiculo: number;
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
    public id_veiculo!: number;
    public origem!: string;
    public destino!: string;
    // TODO: os datatypes dos 3 atributos abaixo estão corretos?
    // se alguém ver no PR me avise sobre
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
        id_veiculo: {
            type: DataTypes.INTEGER,
            allowNull: false
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
            type: DataTypes.DATEONLY,
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


interface AvaliacaoAttributes {
    id_avaliacao: number;
    id_usuario_avaliador: number;
    id_usuario_avaliado: number;
    id_da_carona: number;
    nota: number;
}

class Avaliacao extends Model<AvaliacaoAttributes> implements AvaliacaoAttributes {
    public id_avaliacao!: number;
    public id_usuario_avaliador!: number;
    public id_usuario_avaliado!: number;
    public id_da_carona!: number;
    public nota!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Avaliacao.init(
    {
        id_avaliacao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        id_usuario_avaliador: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_usuario_avaliado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_da_carona: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nota: {
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


interface CaronaPassageiroAttributes {
    id_carona: number;
    id_passageiro: number;
}

class CaronaPassageiro extends Model<CaronaPassageiroAttributes> implements CaronaPassageiroAttributes {
    public id_carona!: number;
    public id_passageiro!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CaronaPassageiro.init(
    {
        id_carona: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        id_passageiro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        }
    },
    {
        sequelize,
        tableName: 'CARONA_PASSAGEIRO',
        timestamps: false
    }
);


// Many-to-many relatioships, tabela própria
Usuario.belongsToMany(Carona, { 
    through: CaronaPassageiro
});
Carona.belongsToMany(Usuario, { 
    through: CaronaPassageiro
});

// 1 carona está associada a 1 motorista
// 1 motorista pode conduzir muitas caronas
Usuario.hasMany(Carona, {
    foreignKey: 'id_usuario',
    as: 'caronas'
})
Carona.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'motorista'
});


Usuario.hasMany(Avaliacao, {
    foreignKey: 'id_usuario_avaliador',
    as: 'avaliacoes_dadas'
});
Avaliacao.belongsTo(Usuario, {
    foreignKey: 'id_usuario_avaliador'
});

Usuario.hasMany(Avaliacao, {
    foreignKey: 'id_usuario_avaliado',
    as: 'avaliacoes_recebidas'
});
Avaliacao.belongsTo(Usuario, {
    foreignKey: 'id_usuario_avaliado'
});


Carona.hasMany(Avaliacao, {
    foreignKey: 'id_da_carona',
    as: 'avaliacoes'
});
Avaliacao.belongsTo(Carona, {
    foreignKey: 'id_da_carona',
    as: 'carona'
});


Usuario.hasMany(Veiculo, {
    foreignKey: 'id_usuario'
});
Veiculo.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
});


export { Usuario, Veiculo, Carona, Avaliacao, CaronaPassageiro };
