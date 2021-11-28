# provi_hacka_pra_todos_back

* REGISTRAR
-  Responsável pelo cadastro do usuário na plataforma, neste versão teremos 3 tipo de usuário:
   -  Voluntaŕios
   -  Pontos de apoio
   -  Estudnates 
  
  
  [POST] /api/registrar
   
   request
    {
        "usuario": string,
        "senha":string,
        "telefone": string,
        "email":string,
        "Logadouro": string,
        "numero": string,
        "complemento": string,
        "bairro": string,
        "cidade": string,
        "uf":string(PB,SC,SP...)
        "cep": string,
        "tipo_usuário": ["voluntario","ponto de apoio", "estudante"]
    }

    
    response  201 
    {
        usuario_id: number,
        usuario: string
    }

    response 400
    Caso já existente
    {
        "Erro":"Usuário já existente"
    }

    Caso tipo_usuario não esteja entre os 3 tipos aceitos:
    {
        "Erro: "Tipo usuário inexistente, aceitos: 'voluntario','ponto_de_apoio', 'estudante'".
    }

    Caso falta de campo obrigatórios:
    {
      ",
        "Campos": "...os campos que faltaram..."
    }  "Erro": "Campos faltantes

* LOGAR
-  Entrada na plataforma
  
  [POST] /api/logar
    body
        "senha":string,  {
        "usuario": string,       
    }

    response 200
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
        "uf":string(PB,SC,SP...)
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

    Response 401
    {
        "Erro": "Erro nome do usuário ou erro na senha!"
    }
  

* Listar voluntários por local (PB/SC/SP/PR...)
[GET] /api/voluntarios/:cidade&uf
response 200
    [{
        "usuario": string,                
        "email":string,
        "bairro": string,
        "cidade": string,
        "uf":string(PB,SC,SP,RJ,PE)                
        "habilidade": string,
        "bio": string,
        ***"cursos": [...cursos],        
    }]

    Response 404
    {
        "Erro": "Dados não encontrado"
    }

* Listar pontos de apoio por local (PB/SC/SP/PR...)
[GET] /api/ponto_apoio/:cidade&uf
response 200
    [{
        "usuario": string,                
        "email":string,
        "bairro": string,
        "cidade": string,
        "uf":string(PB,SC,SP...)                
        "espaço": string,
        "bio": string,      
        
    }]

    Response 404
    {
        "Erro": "Não encontrado dados"
    }

* Listar estudante por local (PB/SC/SP/PR...)
* header bear{token} 
[GET] /api/estudante/:cidade&uf
response 200
    [{
        "usuario": string,                
        "email":string,
        "bairro": string,
        "cidade": string,
        "uf":string(PB,SC,SP...)                
        "espaço": string,
        "bio": string, 
        "aprender":["string"],
        "cursos":[cursos]        
    }]

    Response 404
    {
        "Erro": "Não encontrado dados"
    }
