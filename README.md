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

### 2.1 Arquitectura TI

| N°  | Responsable | Marca  | Procesador            | Núcleos | RAM   | Disco  | SO                             | ID              | Servicio        | Virtualización  |
| --- | ----------- | ------ | --------------------- | ------- | ----- | ------ | ------------------------------ | --------------- | --------------- | --------------- |
| 1   | Jefferson   | Lenovo | AMD 3020e 1.20GHz     | 2       | 3GB   | 1TB    | Ubuntu 22.04 (WSL)              | database-sv-001 | Base de datos   | WSL             |
| 2   | Jefferson   | Azure  | Intel® Xeon® E5-2673 2.3 GHz | 2     | 16GB   | 30GB    | Ubuntu 24.04          | azure-sv-007    | Respaldo de base de datos / Servidor Azure | N/A |
| 3   | Michael     | HP     | i5-1135G7 2.40GHz     | 4       | 8GB   | 20GB  | Ubuntu 22.04 (Máquina Virtual)  | file-sv-002     | Archivos        | Máquina Virtual |
| 4   | Michael     | HP     | i5-1135G7 2.40GHz     | 4     | 4GB   |20GB  | Ubuntu 22.04 (Máquina Virtual)  | sv-balancer-006 | Balanceador de carga adicional | Máquina Virtual |
| 5   | Lisseth     | ASUS   | i7-12700H             | 2      | 3GB  | 20GB    | Ubuntu 22.04 (Máquina Virtual)  | hosting-sv-003  | Hosting web     | Máquina Virtual |
| 6   | Bruce       | HP     | Ryzen 7 5700U 1.80GHz | 4       | 3GB  | 20GB  | Ubuntu 22.04                   | sv-balancer-004 | Balanceador de carga (archivos) | Nativo (Docker) |
| 7   | Noelia      | HP     | i5-1235U              | 2      | 4GB  | 20GB  | Ubuntu 22.04 (Máquina Virtual)  | sv-email-005    | Correo electrónico | Máquina Virtual |

---

### 2.2 Direcciones IP Zerotier - comunicación VPN

| No  | Servicio              | Responsable | SO   | Dirección IP privada    | Dirección IP pública |
| --- | --------------------- | ----------- | ---- | ---------------------- | ------------------ |
| 1   | database-sv-001       | Jefferson   | WSL: Ubuntu 22.04  | 172.27.50.4            | N/A                |
| 2   | database-sv-002-azure | Jefferson   | VM: Ubuntu 24.04  | 4.228.217.124          | 10.0.0.4           |
| 3   | file-sv-003           | Noelia      | VM: Ubuntu 22.04  | 172.27.71.47           | N/A                |
| 4   | file-sv-backup-004    | Bruce       | VM: Ubuntu 24.04  | 172.27.255.154         | N/A                |
| 5   | balancer-sv-005       | Michael     | VM: Ubuntu 24.04  | 172.27.71.47           | N/A                |
| 6   | hosting-sv-006        | Lisseth     | VM: Ubuntu 24.04  | 172.27.16.235          | N/A                |
| 8   | zabbix-sv-008         | Michael     | WSL: Ubuntu 22.04  | N/A                    | N/A                |

---

### 2.3 Topología de Red

- **Tipo:** Estrella
- **Descripción:** 6 servidores conectados a un switch central, enlazado al router principal, más un servidor adicional en Azure bajo responsabilidad de Jefferson.
