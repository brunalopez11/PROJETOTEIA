<<<<<<< HEAD
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export const AreaAlunoPage = () => {
  const { user } = useAuth();

  return (
    <main className="aluno-container">

      <section className="card-aluno">
        <div className="foto-aluno">
          <img src="/img/user-profile.png" alt="Foto do aluno" />
        </div>

        <h2>{user?.nome}</h2>
        <p className="nivel">Nível {user?.nivel || 1} 🎯</p>

        <div className="progresso-container">
          <p>Progresso na plataforma</p>
          <div className="barra">
            <div className="barra-preenchida" style={{ width: "60%" }}></div>
          </div>
          <span>60% Concluído</span>
        </div>

        <div className="upload-cv">
          <label className="cv-label">Enviar Currículo</label>
          <input type="file" disabled />
          <p className="cv-info">*Em breve disponível</p>
        </div>
      </section>

      <section className="cursos-section">
        <h2>Cursos Recomendados</h2>
        <div className="cursos-grid">
          <a href="https://youtu.be/PKwu15ldZ7k" target="_blank" rel="noopener noreferrer" className="curso-card">
            <h3>HTML + CSS Completo</h3>
            <p>Aula completa para iniciantes</p>
          </a>

          <a href="https://youtu.be/3PHXvlpOkf4" target="_blank" rel="noopener noreferrer" className="curso-card">
            <h3>JavaScript Iniciante</h3>
            <p>Fundamentos essenciais</p>
          </a>

          <a href="https://youtu.be/j942wKiXFu8" target="_blank" rel="noopener noreferrer" className="curso-card">
            <h3>React do Zero</h3>
            <p>React moderno explicado</p>
          </a>
        </div>
      </section>

    </main>
  );
};
=======
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export const AreaAlunoPage = () => {
  const { user } = useAuth();

  return (
    <main className="aluno-container">

      <section className="card-aluno">
        <div className="foto-aluno">
          <img src="/img/user-profile.png" alt="Foto do aluno" />
        </div>

        <h2>{user?.nome}</h2>
        <p className="nivel">Nível {user?.nivel || 1} 🎯</p>

        <div className="progresso-container">
          <p>Progresso na plataforma</p>
          <div className="barra">
            <div className="barra-preenchida" style={{ width: "60%" }}></div>
          </div>
          <span>60% Concluído</span>
        </div>

        <div className="upload-cv">
          <label className="cv-label">Enviar Currículo</label>
          <input type="file" disabled />
          <p className="cv-info">*Em breve disponível</p>
        </div>
      </section>

      <section className="cursos-section">
        <h2>Cursos Recomendados</h2>
        <div className="cursos-grid">
          <a href="https://youtu.be/PKwu15ldZ7k" target="_blank" rel="noopener noreferrer" className="curso-card">
            <h3>HTML + CSS Completo</h3>
            <p>Aula completa para iniciantes</p>
          </a>

          <a href="https://youtu.be/3PHXvlpOkf4" target="_blank" rel="noopener noreferrer" className="curso-card">
            <h3>JavaScript Iniciante</h3>
            <p>Fundamentos essenciais</p>
          </a>

          <a href="https://youtu.be/j942wKiXFu8" target="_blank" rel="noopener noreferrer" className="curso-card">
            <h3>React do Zero</h3>
            <p>React moderno explicado</p>
          </a>
        </div>
      </section>

    </main>
  );
};
>>>>>>> 2b56c1b (Restruturando Código)
