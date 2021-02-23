SELECT URL options:

- http://localhost:3000/select/?opcaoSelect=GAMES&daTabelaEmQue= #Retorna todas as tabelas com nome de GAMES.
- http://localhost:3000/select/?opcaoSelect=GAMES&daTabelaEmQue=Paciencia #Rotorna todas as tabelas GAMES que possuem o campo NAME igual a Paciencia.

- http://localhost:3000/select/?opcaoSelect=PLATAFORMS&daTabelaEmQue=PC #Retorna todas as tabelas PLATAFORMS que possuem o campo NAME igual a PC.

- http://localhost:3000/select/?opcaoSelect=RELEASES&daTabelaEmQue=2 #Retorna todas as tabelas RELEASES que possuem o campo GAME igual a 2.
- http://localhost:3000/select/?opcaoSelect=RELEASES&daTabelaEmQue=3 #Retorna todas as tabelas RELEASES que possuem o campo PLATAFORM igual a 3.

INSERT URL options:
- TABELA GAMES:http://localhost:3000/insert/SONIC..SEGA

- TABELA PLATAFORMS: http://localhost:3000/insert/CONSOLE

- TABELA RELEASES: http://localhost:3000/insert/13..55..DATA..11

DELETE url options:
- TABELA GAMES
- http://localhost:3000/delete/?opcaoDelete=GAMES&GAMESgame_IdOrName=11
- http://localhost:3000/delete/?opcaoDelete=GAMES&GAMESgame_IdOrName=SONIC

- TABELA PLATAFORMS
- http://localhost:3000/delete/?opcaoDelete=PLATAFORMS&PLATAFORMSplataforms_IdOrName=45
- http://localhost:3000/delete/?opcaoDelete=PLATAFORMS&PLATAFORMSplataforms_IdOrName=testeInputPlat

- TABELA RELEASES:
- http://localhost:3000/delete/?opcaoDelete=RELEASES&game=4&plataform=25&version=12
