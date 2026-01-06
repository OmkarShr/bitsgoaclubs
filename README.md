# BITS Goa Student Clubs Portfolio

This is the official portfolio website for BITS Pilani Goa Campus Student Clubs, developed by **Omkar Shrikanth**.

## 🚀 One-Click Deployment

The easiest way to deploy this website is using **Vercel**.

1.  **Push to GitHub**:
    *   Create a new repository on GitHub named `bitsgoaclubs`.
    *   Run the following commands in this folder:
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/bitsgoaclubs.git
        git branch -M main
        git push -u origin main
        ```

2.  **Deploy on Vercel**:
    *   Go to [Vercel Dashboard](https://vercel.com).
    *   Click "Add New..." -> "Project".
    *   Import your `bitsgoaclubs` repository.
    *   **Framework Preset**: Select `Vite`.
    *   Click **Deploy**.

That's it! Your website will be live.

## 🛠 Local Development

To run this project locally:

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

- `src/data/clubs.json`: Contains all club data (automatically generated).
- `public/club-images/`: images for all clubs.
- `src/components/`: Reusable UI components (Hero, ClubCard, Layout).

## 📝 Credits

Developed by **Omkar Shrikanth**.
