export type Details = {
  id: number;
  countVisite: number;
  note: number;
  message: string;
  /*  libelle: string; */
  /*  categorie: {
    id: number;
    libelle: string;
  }; */
  sousCategorie: {
    id: number;
    libelle: string;
  };
  prestataire: {
    id: number;
    denominationSociale: string;
    contactPrincipal: string;
    statut: string;
    quartier: string;
    quartierService: string;
    ville: string;
  };
  service: {
    id: number;
    libelle: string;
  };
  image: {
    fileNamePath: string;
  };
};
