# provi_hacka_pra_todos_back

## PROJETO
    
  A Plataforma “Mulheres engajadas” conecta mulheres de comunidades carentes que necessitam ter acesso a conhecimentos, principalmente tecnológicos, que podem criar tecnologias, mas também usar em seu contexto social e econômico. Para disseminação desse conhecimento a plataforma possibilitará a conexão com pessoas voluntárias, como por exemplo instrutores, mentores, apoiadores, que possibilitarão que esse conhecimento atinja o público-alvo e conecta os pontos de apoio com o mínimo de estrutura, como uma ONG, um salão, uma garagem, uma escola.

  Objetivo é  ofertar cursos/palestras/conteúdos, principalmente tecnológicos, presenciais ou on-line, para mulheres de baixa renda, por meio de rede de pessoas voluntárias.

  Na plataforma terá os cadastros dos atores envolvidos, e lista dos cursos oferecidos, e formação da turma para o evento.
  Neste momento não estará incluso, dentro da plataforma, a excecução do curso em si, mas sim o contato entre as partes e lista dos inscritos.
  Sendo o curso e sua apresentação ficará a cretério e responsabilidade do voluntário instrutor / ponto de apoio.


- Neste versão teremos 3 tipo de usuário, que ao fazer o registro deverá ser informado um deles:
   * voluntario
      - Voluntários é a comunidade geral que deseja contribuir de alguma forma para o projeto, a ideia da plataforma é ser regional, assim facilita o voluntário atuar na sua região, ou escolher uma região que deseja prestar seus serviços sociais.
      - exemplos de voluntários: instrutores, divulgadores, mentores, auxiliares ...
   
   *  ponto_de_apoio
      - Ponto de apoio, são estrtruturas físicas que estão situados nas regiões,
       onde ocorrerão os encontros para os eventos presenciais.
      - exemplos: ONGS, escolas, igrejas, associações ...

  *  Estudantes 
      -  São as mulheres que tenham interesses de participar dos eventos, em seu perfil poderá ver os cursos que está
      -  participando, ou já finalizado.
      -  Também é possível incluir os saberes que gostaria de aprender.
  
 

  ## EndPoints
  
  #### Registar

[POST] /api/registrar
   
>request

        {
            "usuario": string not null,
            "senha":string not null,
            "telefone": string,
            "email":string,                        
            "bairro": string,
            "cidade": string,
            "uf":string(PB,SC,SP...)
            "cep": string,
            "tipo_usuário": ["voluntario","ponto de apoio", "estudante"] (not null)
        }

> response  staus 201

        {
            "mensagem" : "Usuário criado com sucesso!"
        }

> response status 400
   
    {
        "Erro":"Usuário já existente"
    }
   
    {
        "Erro: "Tipo usuário inexistente, aceitos: 'voluntario','ponto_de_apoio', 'estudante'".
    }
   
    {
       "Erro": "Campos obrigatórios faltando"
    }

> response status 500

    {
        "erro" "mensagem do erro do bd"
    }

#### LOGAR

  
[POST] /api/logar

> request

    {
        "senha":string, 
        "usuario": string,       
    }

> response status 200

    {   "token": string,
        "id_usuario": number,
        "usuario": string,        
        "telefone": string,
        "email":string,
        "Endereço": string,
        "numero": string,
        "complemento": string,
        "bairro": string,
        "cidade": string,
        "uf":string
        "cep": string,
        "tipo_usuario": string,
        "bio": string,
        -- se voluntário: editado via put
            "habilidade": string,             
            ***"cursos": [...cursos],
        -- se ponto_de_apoio:
            "espaço": string,
        -- se estudante: quado o estudante entrar no curso [cursos]
            "aprender": [string],
            **cursos:[...cursos]
    }

> Response 401

    {
        "Erro": "Erro nome do usuário ou erro na senha!"
    }
  
#### Listar 
  Obrigatório para todas estas rotas estar logado, com passagem do token

* listar voluntário por id
  
[GET] /api/voluntarios/:id

> response 200

    {   "id":number,
        "usuario": string,                
        "email":string,
        "telefone": string,
        "logadouro": string,
        "numero": string,
        "complemento": string,
        "bairro": string,
        "cidade": string,
        "uf":string
        "habilidade": string,
        "bio": string,
        ***"cursos": [...cursos],        
    }

> Response 401

    {
        "Erro": "Token inexistente ou inválido!"
    }

> Response 404

    {
        "Erro": "Usuário não encontrado!"
    }



* Listar voluntários por regiao
[GET] /api/voluntarios/:cidade&uf

> response status 200
    [
      {
        "id": number,
        "usuario": string,                
        "email":string,
        "bairro": string,
        "cidade": string,
        "uf":string(PB,SC,SP,RJ,PE)                
        "habilidade": string,
        "bio": string,
        ***"cursos": [...cursos],        
      },
      {...},
    ]

> Response 401

    {
        "Erro": "Token inexistente ou inválido!"
    }

> Response status 404

    {
        "Erro": "Dados não encontrado"
    }



* Listar ponto de apoio por id

[GET] /api/pontos_apoio/:id

> response status 200

    {
        "usuario": string,                
        "email":string,
        "bairro": string,
        "cidade": string,
        "uf":string(PB,SC,SP...)                
        "espaço": string,
        "bio": string,              
    }

> Response 401

    {
        "Erro": "Token inexistente ou inválido!"
    }

> Response 404

    {
        "Erro": "Ponto de apoio não encontrado!"
    }



* Listar pontos de apoio por local

[GET] /api/pontos_apoio/:cidade&uf

> response status 200

    [
      {
        "usuario": string,                
        "email":string,
        "bairro": string,
        "cidade": string,
        "uf":string(PB,SC,SP...)                
        espaco": string,
        "bio": string,      
        
      },
      {...}
    ]

> Response status 404

    {
        "Erro": "Não encontrado dados"
    }



* listar estudante por id
  
[GET] /api/estudantes/:id

> response 200

    {   
        "id":number,
        "usuario": string,                
        "email":string,
        "telefone": string,
        "logadouro": string,
        "numero": string,
        "complemento": string,
        "bairro": string,
        "cidade": string,
        "uf":string,        
        "bio": string,
       "aprender":["string"],
        "cursos":[cursos]       
    }

> Response 401

    {
        "Erro": "Token inexistente ou inválido!"
    }

> Response 404

    {
        "Erro": "Usuário não encontrado!"
    }



* Listar estudante por local

[GET] /api/estudantes/:cidade&uf

> response status 200

    [
      {
        "usuario": string,                
        "email":string,
        "bairro": string,
        "cidade": string,
        "uf":string(PB,SC,SP...)                        
        "bio": string, 
        "aprender":["string"],
        "cursos":[cursos]        
      },
      {...}
    ]


> Response 401

    {
        "Erro": "Token inexistente ou inválido!"
    }

> Response status 404

    {
        "Erro": "Não encontrado dados"
    }


#### Atualizar dados 
  Obrigatório para todas estas rotas estar logado, com passagem do token

* Atualizar voluntário
  
[PUT] /api/voluntarios/:id
> Request

    {
        "id":number,
        "usuario": string,                
        "email":string,
        "telefone": string,
        "logadouro": string,
        "numero": string,
        "complemento": string,
        "bairro": string,
        "cidade": string,
        "uf":string
        "habilidade": string,
        "bio": string,        
    }

> response 200

   {   "id":number,
        "usuario": string,                
        "email":string,
        "telefone": string,
        "logadouro": string,
        "numero": string,
        "complemento": string,
        "bairro": string,
        "cidade": string,
        "uf":string
        "habilidade": string,
        "bio": string,
        ***"cursos": [...cursos],        
    }

> Response 401

    {
        "Erro": "Token inexistente ou inválido!"
    }

> Response 404

    {
        "Erro": "Usuário não encontrado!"
    }


* Atualizar ponto de apoio
  
[PUT] /api/pontos_de_apoio/:id
> Request

    {
        "id":number,
        "usuario": string,                
        "email":string,
        "telefone": string,
        "logadouro": string,
        "numero": string,
        "complemento": string,
        "bairro": string,
        "cidade": string,
        "uf":string
        "espaco": string,
        "bio": string,        
    }

> response 200

   {   "id":number,
        "usuario": string,                
        "email":string,
        "telefone": string,
        "logadouro": string,
        "numero": string,
        "complemento": string,
        "bairro": string,
        "cidade": string,
        "uf":string
        "espaco": string,
        "bio": string,        
    }

> Response 401

    {
        "Erro": "Token inexistente ou inválido!"
    }

> Response 404

    {
        "Erro": "Ponto de apoio não encontrado!"
    }



* Atualizar estudante
  
[PUT] /api/estudantes/:id
> Request

    {       
        "usuario": string,                
        "email":string,
        "telefone": string,
        "logadouro": string,
        "numero": string,
        "complemento": string,
        "bairro": string,
        "cidade": string,
        "uf":string,        
        "bio": string        
    }

> response 200

   {   
       "id":number,
        "usuario": string,                
        "email":string,
        "telefone": string,
        "logadouro": string,
        "numero": string,
        "complemento": string,
        "bairro": string,
        "cidade": string,
        "uf":string,        
        "bio": string,
        "aprender":["string"],
        "cursos":[cursos]          
    }

> Response 401

    {
        "Erro": "Token inexistente ou inválido!"
    }

> Response 404

    {
        "Erro": "Ponto de apoio não encontrado!"
    }
