// Remplit la page avec le contenu défini dans contenu.js
function chargerContenu() {
  const page = document.body.dataset.page;
  if (!page || !contenu[page]) return;

  const data = contenu[page];

  // Titre
  const titreEl = document.getElementById('titre');
  if (titreEl && data.titre) titreEl.textContent = data.titre;

  // Sous-titre (accueil uniquement)
  const sousTitreEl = document.getElementById('sous-titre');
  if (sousTitreEl && data.sousTitre) sousTitreEl.textContent = data.sousTitre;

  // Texte
  const texteEl = document.getElementById('texte');
  if (texteEl && data.texte) texteEl.textContent = data.texte;

  // Crédits (page fin)
  const creditsEl = document.getElementById('credits');
  if (creditsEl && data.credits) creditsEl.textContent = data.credits;
}

document.addEventListener('DOMContentLoaded', chargerContenu);
