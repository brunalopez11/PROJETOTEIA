<<<<<<< HEAD
package com.teia.sitebackend.dto;

/**
 * DTO para resposta de Candidato (não expõe senha)
 */
public class CandidatoDTO {
    private String candidato_id;
    private String nome;
    private String cpf;
    private String email;

    public CandidatoDTO() {
    }

    public CandidatoDTO(String candidato_id, String nome, String cpf, String email) {
        this.candidato_id = candidato_id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
    }

    public String getCandidato_id() {
        return candidato_id;
    }

    public void setCandidato_id(String candidato_id) {
        this.candidato_id = candidato_id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
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
}
=======
package com.teia.sitebackend.dto;

/**
 * DTO para resposta de Candidato (não expõe senha)
 */
public class CandidatoDTO {
    private String candidato_id;
    private String nome;
    private String cpf;
    private String email;

    public CandidatoDTO() {
    }

    public CandidatoDTO(String candidato_id, String nome, String cpf, String email) {
        this.candidato_id = candidato_id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
    }

    public String getCandidato_id() {
        return candidato_id;
    }

    public void setCandidato_id(String candidato_id) {
        this.candidato_id = candidato_id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
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
}
>>>>>>> 2b56c1b (Restruturando Código)
