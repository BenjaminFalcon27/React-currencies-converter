# TP : Convertisseur de devises

## Créez 2 routes / et /404

- Ajoutez le router sur l'application
- Il y a deux composants de pages à créer (convertisseur et 404)
- pour le contenu de la page 404 vous êtes libres (soyez créatifs :))
- le contenu HTML de la page du convertisseur est présent dans App.
- toutes les routes autres que '/' doivent aboutir à la page 404

## Développez le convertisseur

### Organisation

- Découper et organisez l'application de façon optimale, créer des composants autant que nécessaire.
(créer des composants réutilisables comme le select par exemple)

- Les champs From et To proposeront uniquement les listes des devises déjà placées dans le template fourni (EUR, CHF, GBP et USD)

- Le champ de saisie Amount :

  - devra gérer le cas où l'utilisateur saisi un "0" en premier pour le forcer en number (ex : 0458 => 458)
  - devra se mettre en erreur si des caractères autre des chiffres sont saisis (ajoute la classe "invalid" sur le champ)
  - devra se mettre en valide si des caractères autre des chiffres sont saisis (ajoute la classe "valid"  sur le champ)
    pour plus d'info sur les classes de validation : https://materializecss.com/text-inputs.html

  > Aide : Il se peut que vous ayez un bug d'affichage sur le champ 
  > Vous pouvez utiliser cette solution pour le résoudre :

  ```javascript
  useEffect(() => {
    M.updateTextFields();
  }, []);
  ```

### API de conversion

- Pour effectuer la conversion pour pouvez utiliser cette route d'API : https://react-starter-api.vercel.app/api/convert/:base_currency
  ":base_currency" sera votre paramètre de la devise de référence et l'API renverra un tableau de conversion pour les autres devises.

> Observer la format de la réponse, le montant devra être converti avec le bon coefficient de conversion

C'est la valeur du champ From qui sera votre paramètre d'url

- L'appel au web service API ne devra se faire que si :
  - le montant saisi est différent de zéro
  - chaque fois que l'on modifie un des champs (From, To ou Amount)
  - pas d'appel si From et To sont égaux, si il y a un changement sur champ Amount, celui-ci sera affiché dans Result sans conversion
  - pas d'appel en cas d'erreur sur le champ, on affichera 0 dans Result

> Aide : Vous aurez probablement besoin de comparer l'état courant de l'état précédent de ces champs : https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state

Pour vous aider, je vous ai fourni un hook qui permet d'obtenir l'état précédent, il s'utilise de la façon suivante :

  ```javascript
const prevStateForm = usePrevious(stateForm);
```
De cette manière, vous pourrez conditionner l'appel de votre fetch selon les règles imposées.

(ne pas oublier de l'importer)

### Affichage du résultat

- le résultat de la conversion devra s'afficher devant le libellé "Result :"
- Affichez le spinner (fourni) pendant l'appel de service (toujours en face de "Result :")


J'ai écrit des scenarios de tests que vous devez respecter pour valider le fonctionnel attendu (cf fichier EXAMPLE_MAPPING.md)
