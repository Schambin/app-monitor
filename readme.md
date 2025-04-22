# ⏱ App Usage Tracker

Um pequeno utilitário em Node.js para monitorar o tempo de uso de aplicativos ativos no seu sistema operacional. O programa registra qual aplicativo está em primeiro plano e por quanto tempo ele foi utilizado, salvando os dados em um arquivo `.json`.

### 📦 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [active-win](https://www.npmjs.com/package/active-win) – para capturar a janela ativa do sistema
- `fs` (File System) – para leitura e escrita dos arquivos de log

## 🚀 Como usar

### 1. Clone o repositório

```bash
git clone https://github.com/Schambin/app-monitor
cd app-monitor
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Compile o TypeScript
```bash
npx tsc
```

### 4. Rode o monitor
```bash
node .\dist\index.js
```

Você pode rodar com --inspect se quiser debugar: node --inspect .\dist\index.js

## 📁 Estrutura dos Logs
### O arquivo app-log.json é atualizado continuamente e estruturado da seguinte forma:

```json
{
  "logs": [
    {
      "date": "2025-04-21",
      "activities": [
        {
          "name": "Chrome",
          "timeInSeconds": 5400,
          "lastTimeUsed": "2025-04-21T14:12:00.000Z"
        },
        ...
      ]
    }
  ]
}
```

As atividades são ordenadas por tempo de uso (do maior para o menor).

## 💡 Funcionalidades
* 📊 Monitora o tempo gasto por aplicativo em tempo real

* 📅 Organiza logs por data

* 🔢 Agrupa e atualiza automaticamente o tempo de uso

* 📁 Salva os dados em arquivo JSON estruturado

* 🧠 Possibilidade de expandir com categorias, relatórios e dashboard

## 🤝 Contribuindo
### Sinta-se à vontade para abrir issues e pull requests. Toda contribuição é bem-vinda!

## 📝 Licença
### Este projeto está licenciado sob a licença MIT.