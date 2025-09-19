package com.teia.sitebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "candidato")
public class Candidato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer candidato_id;
    private String nome;
    private String cpf;
    private String email;
    private String senha;

    public Candidato() {
    }

    public Candidato(Integer candidato_id, String cpf, String email, String nome, String senha) {
        this.candidato_id = candidato_id;
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.senha = senha;
    }

    public Integer getCandidato_id() {
        return candidato_id;
    }

    public void setCandidato_id(Integer candidato_id) {
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
