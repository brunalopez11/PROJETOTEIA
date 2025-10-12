package com.teia.sitebackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "candidatos")
public class Candidato {
    @Id
    private String candidato_id;
    
    private String nome;
    
    @Indexed(unique = true)
    private String cpf;
    
    @Indexed(unique = true)
    private String email;
    
    private String senha;

    public Candidato() {
    }

    public Candidato(String candidato_id, String cpf, String email, String nome, String senha) {
        this.candidato_id = candidato_id;
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.senha = senha;
    }

    public String getCandidato_id() {
        return candidato_id;
    }

    public void setCandidato_id(String candidato_id) {
        this.candidato_id = candidato_id;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
