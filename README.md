# My E-commerce Demo App 🛒

![My Demo App](/assets/images/File-Cover.png)

Este é um aplicativo mobile de e-commerce criado com [Expo](https://expo.dev) usando [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 📌 Requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

Versão do Expo utilizada:

```json
"expo": "~52.0.37"
```

## 🚀 Como iniciar o projeto

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/ClebyFrancisco/my_ecommerce_demo_app.git
```

### 2️⃣ Acesse o diretório do projeto

```bash
cd my_ecommerce_demo_app
```

### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione:

```ini
EXPO_PUBLIC_API_URL="http://10.0.0.136:3000"
```

> A API está disponível em [my_ecommerce_demo_api](https://github.com/ClebyFrancisco/my_ecommerce_demo_api). Siga as instruções para iniciá-la antes de rodar o app e insira a URL correta no `.env`.

### 4️⃣ Instale as dependências

```bash
yarn install
```

### 5️⃣ Inicie o app

```bash
npx expo start -c
```

---

Agora você pode testar o aplicativo no emulador ou no dispositivo físico usando o Expo Go! 🎉
