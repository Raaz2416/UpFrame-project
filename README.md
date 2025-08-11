# AI Image Enhancer

A modern web application to enhance images using an AI-powered API. Users can upload images, preview the original and enhanced versions, and download the enhanced result. The app enforces strict validation for file type, size, and dimensions.

✨ Core Features 
Easy Uploads: Supports PNG, JPG, JPEG, WEBP, GIF, BMP, and TIFF formats
Smart Validation: Ensures files are within 15MB and 4096×4096 px
Live Preview: View original and enhanced images next to each other
One-Click Download: Save your improved image instantly
Clean, Responsive Design: Built with Tailwind CSS for modern UI styling
Smooth Processing: Shows a loading indicator while enhancement is in progress

🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd upframe
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory and add your API credentials:
   ```env
   VITE_API_KEY=your_api_key_here
   VITE_BASE_URL=https://your-api-base-url.com
   VITE_MAXIMUM_RETRIES=10
   ```

### Running the App
```sh
npm run dev
# or
yarn dev
```
App will run at: http://localhost:5173 (or the port displayed in your terminal)

📂 Project Structure
```
upframe/
├── src/
│   ├── components/
│   │   ├── Home.jsx
│   │   ├── ImageUpload.jsx
│   │   ├── ImagePreview.jsx
│   │   └── Loading.jsx
│   ├── utils/
│   │   └── enhanceImageAPI.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

📏 Image Guidelines
Max size: 15MB
Max dimensions: 4096×4096 pixels
Accepted formats: PNG, JPG, JPEG, WEBP, GIF, BMP, TIFF

## Environment Variables
| Variable              | Description                |
|-----------------------|----------------------------|
| VITE_API_KEY          | Your API key               |
| VITE_BASE_URL         | API base URL               |
| VITE_MAXIMUM_RETRIES  | Max polling retries        |

## License
This project is licensed under the MIT License.
