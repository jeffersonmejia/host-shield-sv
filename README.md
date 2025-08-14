# 📄 Host Shield

**Universidad:** Universidad de las Fuerzas Armadas – ESPE  
**Integrantes:**

- Casas Castaño Michael Alejandro
- Mejía Chávez Jefferson Paúl
- Mendoza Jiler Noelia Kassandra
- Rodríguez Montalván Bruce Leroy
- Torres Getial Jacqueline Lisseth

---

## 1. Resumen

Proyecto de diseño e implementación de un datacenter con **7 servidores** para ofrecer servicios de hosting web, base de datos, respaldo de base de datos, respaldo de archivos, correo electrónico, almacenamiento de archivos multimedia y balanceo de carga con Docker.  
La red implementa una **topología estrella** conectando los servidores mediante LAN. Se destaca que el equipo **hosting-sv-003** es el más potente, mientras que **database-sv-001** es el de menor capacidad.

---

## 2. Desarrollo

### 2.1 Requisitos

| Servicio                            | Descripción técnica breve                   |
| ----------------------------------- | ------------------------------------------- |
| **Base de datos**                   | Almacenamiento de usuarios y suscripciones. |
| **Archivos**                        | Gestión centralizada de archivos.           |
| **Hosting web**                     | Publicación de sitios web.                  |
| **Balanceador de carga (archivos)** | Distribución del tráfico al File Server.    |
| **Correo electrónico**              | Gestión de correo electrónico.              |
| **Respaldo de archivos**            | Servidor de respaldo para archivos (CRUZ).  |
| **Balanceador de carga adicional**  | Balanceo extra, responsable Michael.        |

### 2.2 Infraestructura Tecnológica

| N°  | Responsable | Marca  | Procesador            | Núcleos       | RAM           | Disco         | SO                             | ID              | Servicio        | Virtualización  |
| --- | ----------- | ------ | --------------------- | ------------- | ------------- | ------------- | ------------------------------ | --------------- | --------------- | --------------- |
| 1   | Jefferson   | Lenovo | AMD 3020e 1.20GHz     | 2             | 8GB           | 1TB           | Ubuntu 22.04 (WSL)             | database-sv-001 | database-sv     | WSL             |
| 2   | Michael     | HP     | i5-1135G7 2.40GHz     | 4             | 8GB           | 500GB         | Ubuntu 22.04 (Máquina Virtual) | file-sv-002     | file-sv         | Máquina Virtual |
| 3   | Lisseth     | ASUS   | i7-12700H             | 14            | 16GB          | 1TB           | Ubuntu 22.04 (Máquina Virtual) | hosting-sv-003  | hosting-sv      | Máquina Virtual |
| 4   | Bruce       | HP     | Ryzen 7 5700U 1.80GHz | 8             | 16GB          | 500GB         | Ubuntu 22.04                   | sv-balancer-004 | balancer-sv-004 | Nativo (Docker) |
| 5   | Noelia      | HP     | i5-1235U              | 10            | 16GB          | 500GB         | Ubuntu 22.04 (Máquina Virtual) | sv-email-005    | email-sv-005    | Máquina Virtual |
| 6   | Michael     | HP     | (especificar)         | (especificar) | (especificar) | (especificar) | Ubuntu 22.04 (Máquina Virtual) | sv-balancer-006 | balancer-sv-006 | Máquina Virtual |
| 7   | Jefferson   | Azure  | N/A                   | N/A           | N/A           | N/A           | N/A                            | azure-sv-007    | servidor-azure  | N/A             |

### 2.3 Direcciones IP Zerotier - comunicación VPN

| No  | Servicio              | Responsable | Dirección IP    |
| --- | --------------------- | ----------- | --------------- |
| 1   | database-sv-001       | Jefferson   | 172.27.50.4     |
| 2   | database-sv-002-azure | Jefferson   | N/A             |
| 3   | file-sv-003           | Noelia      | 172.27.71.47    |
| 4   | file-sv-backup-004    | Bruce       | Pendiente       |
| 5   | balancer-sv-005       | Michael     | Pendiente       |
| 6   | hosting-sv-006        | Lisseth     | 172.27.16.235   |
| 8   | zabbix-sv-008         | Michael     | N/A             |


---

### 2.4 Topología de Red

- **Tipo:** Estrella
- **Descripción:** 6 servidores conectados a un switch central, enlazado al router principal, más un servidor adicional en Azure bajo responsabilidad de Jefferson.
