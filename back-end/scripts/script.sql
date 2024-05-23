CREATE DATABASE IF NOT EXISTS TRABALHOES2;

USE TRABALHOES2;

DROP TABLE IF EXISTS AVALIACAO;
DROP TABLE IF EXISTS CARONA;
DROP TABLE IF EXISTS VEICULO;
DROP TABLE IF EXISTS USUARIO;

CREATE TABLE USUARIO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    senha VARCHAR(200) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    profile_pic VARCHAR(255),
);

CREATE TABLE VEICULO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(10) UNIQUE,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    cor VARCHAR(50),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id)
);

CREATE TABLE CARONA(
    id_carona_atual INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    origem VARCHAR(255),
    destino VARCHAR(255),
    data DATE,
    horario_de_partida TIME,
    horario_de_retorno TIME,
    qt_de_passageiros INT,
    aceita_automaticamente BOOLEAN,
    raio_de_aceitacao_em_km DOUBLE,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id)
);

CREATE TABLE AVALIACAO (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_avaliador INT,
    id_usuario_avaliado INT,
    id_da_carona INT,
    qualidade_da_carona INT,
    FOREIGN KEY (id_usuario_avaliador) REFERENCES USUARIO(id),
    FOREIGN KEY (id_usuario_avaliado) REFERENCES USUARIO(id),
    FOREIGN KEY (id_da_carona) REFERENCES CARONA(id_carona_atual)
);