export type SousCategorie = {
  id: number;
  libelle: string;
  categorie: {
    id: number;
    libelle: string;
  };
  image: {
    fileNamePath: string;
  };
};
