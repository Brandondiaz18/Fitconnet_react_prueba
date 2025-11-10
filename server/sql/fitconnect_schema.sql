DROP DATABASE IF EXISTS fitConnect;
CREATE DATABASE fitConnect;
USE fitConnect;

-- Objetivos
CREATE TABLE objetivos (
    id_objetivo INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

-- Usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_objetivo INT,
    FOREIGN KEY (id_objetivo) REFERENCES objetivos(id_objetivo)
);

-- Roles
CREATE TABLE rol_usuarios (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(50) NOT NULL
);

-- Relación Usuario - Rol
CREATE TABLE usuario_rol (
    id_usuario INT,
    id_rol INT,
    fecha_asignacion DATE,
    PRIMARY KEY (id_usuario, id_rol),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_rol) REFERENCES rol_usuarios(id_rol)
);

-- Rutinas
CREATE TABLE rutinas (
    id_rutina INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    nombre_rutina VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Ejercicios
CREATE TABLE ejercicios (
    id_ejercicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    grupo_muscular VARCHAR(50)
);

-- Relación Rutinas - Ejercicios
CREATE TABLE rutina_ejercicios (
    id_rutina INT,
    id_ejercicio INT,
    repeticiones INT,
    series INT,
    PRIMARY KEY (id_rutina, id_ejercicio),
    FOREIGN KEY (id_rutina) REFERENCES rutinas(id_rutina),
    FOREIGN KEY (id_ejercicio) REFERENCES ejercicios(id_ejercicio)
);

-- Dietas
CREATE TABLE planes_dieta (
    id_dieta INT AUTO_INCREMENT PRIMARY KEY,
    nombre_dieta VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Relación Usuario - Dieta
CREATE TABLE usuario_dieta (
    id_usuario INT,
    id_dieta INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    PRIMARY KEY (id_usuario, id_dieta),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_dieta) REFERENCES planes_dieta(id_dieta)
);

-- Progreso
CREATE TABLE progreso_usuario (
    id_progreso INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    peso_actual DECIMAL(5,2),
    grasa_corporal DECIMAL(5,2),
    masa_muscular DECIMAL(5,2),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Publicaciones
CREATE TABLE publicaciones (
    id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    contenido TEXT NOT NULL,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Comentarios
CREATE TABLE comentarios (
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    id_publicacion INT,
    id_usuario INT,
    comentario TEXT NOT NULL,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_publicacion) REFERENCES publicaciones(id_publicacion),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Logros
CREATE TABLE logros (
    id_logro INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(200) NOT NULL
);

-- Relación Usuario - Logros
CREATE TABLE usuario_logros (
    id_usuario INT,
    id_logro INT,
    fecha_obtencion DATE,
    PRIMARY KEY (id_usuario, id_logro),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_logro) REFERENCES logros(id_logro)
);

-- Ejecución de Rutinas
CREATE TABLE ejecucion_rutina (
    id_ejecucion INT AUTO_INCREMENT PRIMARY KEY,
    id_rutina INT,
    id_usuario INT,
    fecha_ejecucion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    duracion INT,
    FOREIGN KEY (id_rutina) REFERENCES rutinas(id_rutina),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Población (demográficos)
CREATE TABLE poblacion (
    id_poblacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    sexo ENUM('Hombre', 'Mujer') NOT NULL,
    fecha_registro DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);