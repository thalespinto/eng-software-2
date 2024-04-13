CREATE DATABASE IF NOT EXISTS TRABALHOES2;

USE TRABALHOES2;

DROP TABLE IF EXISTS AVALIACOES;
DROP TABLE IF EXISTS CARONAS_PASSADAS;
DROP TABLE IF EXISTS CARONAS_ATUAIS;
DROP TABLE IF EXISTS VEICULO;
DROP TABLE IF EXISTS USUARIO;

CREATE TABLE USUARIO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    esta_oferecendo_carona BOOLEAN,
    reputacao INT
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

CREATE TABLE CARONAS_ATUAIS (
    id_carona_atual INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    local_de_partida VARCHAR(255),
    destino VARCHAR(255),
    data DATE,
    horario_de_partida TIME,
    horario_de_retorno TIME,
    qt_de_passageiros INT,
    aceita_automaticamente BOOLEAN,
    em_progresso BOOLEAN,
    raio_de_aceitacao_em_km DOUBLE,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id)
);

CREATE TABLE CARONAS_PASSADAS (
    id_carona_passada INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    local_de_partida VARCHAR(255),
    destino VARCHAR(255),
    data DATE,
    qt_de_passageiros INT,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id)
);

CREATE TABLE AVALIACOES (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_avaliador INT,
    id_usuario_avaliado INT,
    id_da_carona INT,
    qualidade_da_carona INT,
    FOREIGN KEY (id_usuario_avaliador) REFERENCES USUARIO(id),
    FOREIGN KEY (id_usuario_avaliado) REFERENCES USUARIO(id),
    FOREIGN KEY (id_da_carona) REFERENCES CARONAS_ATUAIS(id_carona_atual)
);