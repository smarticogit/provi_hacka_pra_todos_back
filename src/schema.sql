drop table if exists usuarios_hacka;

create table if not exists usuarios_hacka(
	id serial primary key,
  	nome text not null,
	usuario text unique not null,
    senha text,
	telefone text,
    email text,
    logradouro text,
    numero text,
    complemento text,
    bairro text,
    cidade text,
    uf text,
    cep text,
    tipo_usuario text
);