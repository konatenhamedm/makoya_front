export type Commentaire = {
  id: number;
  message: string;
  utilisateur: {
    id: number;
    username: string;
    photo: {
      id: number;
      fullName: string;
    };
    quartier: {
      villeQuartier: string;
    };
  };
  note: {
    id: number;
    note: number;
  };

  service: {
    id: number;
    prestataire: {
      id: number;
      username: string;
      denominationSociale: string;
      contactPrincipal: string;
      photo: {
        id: number;
        fullName: string;
      };
      quartier: {
        villeQuartier: string;
      };
    };
    service: {
      id: number;
      libelle: string;
    };
    image: {
      id: number;
      fullName: string;
    };
    etat: true;
  };
};
