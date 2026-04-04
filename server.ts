import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/reserve", async (req, res) => {
    const { cartItems, customerEmail } = req.body;

    if (!cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ error: "Carrinho inválido" });
    }

    const adminEmail = "daccumbe@gmail.com";
    
    // Create email body
    const itemsList = cartItems.map((item: any) => 
      `- ${item.name} (${item.color}, Tam: ${item.size}, Qtd: ${item.quantity}) - ${item.price}`
    ).join("\n");

    const emailBody = `
      Nova reserva recebida!
      
      Detalhes do Pedido:
      ${itemsList}
      
      E-mail do Cliente: ${customerEmail || "Não informado"}
    `;

    try {
      // Setup transporter (using environment variables)
      // Note: User will need to provide these in the settings menu
      const transporter = nodemailer.createTransport({
        service: "gmail", // Or another service
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: `"D@C Store" <${process.env.SMTP_USER}>`,
          to: adminEmail,
          subject: "Nova Reserva de Pedido - D@C Store",
          text: emailBody,
        });
        console.log("E-mail enviado com sucesso para o administrador.");
      } else {
        console.warn("SMTP_USER ou SMTP_PASS não configurados. E-mail não enviado.");
      }

      res.json({ success: true, message: "Reserva processada com sucesso" });
    } catch (error) {
      console.error("Erro ao processar reserva:", error);
      res.status(500).json({ error: "Erro ao processar reserva" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
