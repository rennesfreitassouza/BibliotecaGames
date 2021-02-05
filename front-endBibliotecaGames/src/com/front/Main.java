package com.front;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        boolean loop = true;
        do {
            System.out.println("Menu opcoes:\n1 - Criacao\n2 - Delecao\n3 - Listagem\n4 - Sair");
            String opcao = retornoLinhaComando();

            if (opcao.equals("1") || opcao.equals("2") || opcao.equals("3")) {
                escolhaOperacao(opcao);
            }
            else
                loop = false;

        }while(loop);
    }

    public static String retornoLinhaComando(){
        Scanner inputParaServidor = new Scanner(System.in);
        System.out.print(">");
        String retorno = inputParaServidor.nextLine();

        return retorno;

    }

    public static void escolhaOperacao(String opcao){
        String nomeTabela = new String("");
        switch (opcao){
            case "1":
                System.out.println("Insira o nome da tabela:");
                nomeTabela = retornoLinhaComando();
                insert(nomeTabela);
                break;
            case "2":
                System.out.println("Insira o nome da tabela:");
                nomeTabela = retornoLinhaComando();
                delete(nomeTabela);
                break;
            case "3":
                System.out.println("Insira o nome da tabela:");
                nomeTabela = retornoLinhaComando();
                select(nomeTabela);
                break;
        }
    }

    public static void insert(String nomeTabela){
        boolean valorValido = false;
        if (nomeTabela.equals("GAMES")) {
            apresentacaoOpcoesInput("Para criacao de GAME, insira o input no formato:\n#NAME#PUBLISHER");
            valorValido = true;
        }else {
            if (nomeTabela.equals("PLATAFORMS")) {
                apresentacaoOpcoesInput("Para criacao de PLATAFORMS, insira o input no formato:\n#NAME");
                valorValido = true;
            } else {
                if (nomeTabela.equals("RELEASES")) {
                    apresentacaoOpcoesInput("Para criacao de RELEASES, insira o input no formato:\n#GAME#PLATAFORM#VERSION#DATE");
                    valorValido = true;
                }
            }
        }
        if (valorValido) {
            String input = retornoLinhaComando();

            String valoresInput = input.substring(input.indexOf('(') + 1, input.indexOf(')'));
            valoresInput = valoresInput.replaceAll(", ", "..");
            System.out.println("valoresInput: "+valoresInput);

            rotaParaOperacao("delete", valoresInput, "DELETE");
        }
    }

    public static void delete(String nomeTabela){
        boolean valorValido = false;
        String valoresInputFormatados = new String ("");

        if (nomeTabela.equals("GAMES")) {
            apresentacaoOpcoesInput("Para delecao de GAME, insira o input no formato:\n#ID");
            apresentacaoOpcoesInput("\n#NAME");

            String input = retornoLinhaComando();
            String valoresInput = input.substring(input.indexOf('(') + 1, input.indexOf(')'));
            valoresInputFormatados = ("?opcaoDelete="+nomeTabela+"&GAMESgame_IdOrName="+valoresInput);

            valorValido = true;
        }else {
            if (nomeTabela.equals("PLATAFORMS")) {
                apresentacaoOpcoesInput("Para delecao de PLATAFORMS, insira o input no formato:\n#ID");
                apresentacaoOpcoesInput("\n#NAME");

                String input = retornoLinhaComando();
                String valoresInput = input.substring(input.indexOf('(') + 1, input.indexOf(')'));
                valoresInputFormatados = ("?opcaoDelete="+nomeTabela+"&PLATAFORMSplataforms_IdOrName="+valoresInput);

                valorValido = true;
            } else {
                if (nomeTabela.equals("RELEASES")) {
                    apresentacaoOpcoesInput("Para delecao de RELEASES, insira o input no formato:\n#GAME#PLATAFORM#VERSION");

                    String input = retornoLinhaComando();

                    String [] arrayValoresInput = input.substring(input.indexOf('(') + 1, input.indexOf(')')).split(", ");
                    valoresInputFormatados = ("?opcaoDelete="+nomeTabela+"&game="+arrayValoresInput[0]+"&plataform="+arrayValoresInput[1]+"&version="+arrayValoresInput[2]);

                    valorValido = true;
                }

            }
        }
        if (valorValido) {
            System.out.println("valoresInputFormatados: "+valoresInputFormatados);

            rotaParaOperacao("delete", valoresInputFormatados, "DELETE");
        }
    }

    public static void select(String nomeTabela){
        boolean valorValido = false;
        if (nomeTabela.equals("GAMES")) {
            apresentacaoOpcoesInput("Para listagem de GAMES, insira o input no formato:\n#");
            apresentacaoOpcoesInput("\n#NAME");
            valorValido = true;
        }else {
            if (nomeTabela.equals("PLATAFORMS")) {
                apresentacaoOpcoesInput("Para listagem de PLATAFORMS, insira o input no formato:\n#");
                apresentacaoOpcoesInput("\n#NAME");
                valorValido = true;
            } else {
                if (nomeTabela.equals("RELEASES")) {
                    apresentacaoOpcoesInput("Para listagem de RELEASES, insira o input no formato:\n#");
                    apresentacaoOpcoesInput("\n#GAME");
                    apresentacaoOpcoesInput("\n#PLATAFORM");

                    valorValido = true;
                }
                else {
                    if (nomeTabela.equals("todas")){
                        rotaParaOperacao("select", "?opcaoSelect=todas", "GET");
                    }
                }
            }
        }
        if (valorValido) {
            String input = retornoLinhaComando();

            String valoresInput = input.substring(input.indexOf('(') + 1, input.indexOf(')'));
            String valoresInputFormatados = ("?opcaoSelect="+nomeTabela+"&daTabelaEmQue="+valoresInput);

            System.out.println("valoresInputFormatados: "+valoresInputFormatados);

            rotaParaOperacao("select", valoresInputFormatados, "GET");
        }
    }

    public static void apresentacaoOpcoesInput(String strComTodasOpcoes){
        String [] arrayOpcoes = strComTodasOpcoes.split("#");

        int virgula = arrayOpcoes.length;
        String apresentacaoOpcao = strComTodasOpcoes.substring(0, strComTodasOpcoes.indexOf("\n"));


        for (String strOpcao : arrayOpcoes){
            if (virgula == arrayOpcoes.length) {
                if (apresentacaoOpcao.length() > 2)
                    System.out.println(apresentacaoOpcao);
                System.out.print("input (");
                virgula--;
                continue;
            }
            virgula--;
            if (virgula != 0){
                System.out.print(strOpcao+", ");
            }
            else{
                System.out.print(strOpcao);
            }
        }
        System.out.print(");\n");
    }
    public static void rotaParaOperacao(String operacao, String valores, String requestMethod){
        try{
            URL url = new URL ("http://localhost:3000/" +operacao+ "/"+valores);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod(requestMethod);

            if (conn.getResponseCode() != 200){
                System.out.println("Erro!");
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String outputLeitor, outputFinal = new String ("");

            while ((outputLeitor = br.readLine()) != null){
                outputFinal += outputLeitor;
            }

            System.out.println(outputFinal);

            conn.disconnect();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
