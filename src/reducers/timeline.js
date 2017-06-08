//REDUCER (função redutora)
import { List } from 'immutable';

export function timeline(state=[], action){

    if(action.type === 'LISTAGEM'){
        return new List(action.fotos);
    }

    if(action.type === 'COMENTARIO'){
        const fotoEstadoAntigo = state.find(foto => foto.id === action.fotoId);
        const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.novoComentario);

        const fotoEstadoNovo = Object.assign({}, fotoEstadoAntigo, { comentarios : novosComentarios });

        const indiceDaLista = state.findIndex(foto => foto.id === action.fotoId);
        const novaLista = state.set(indiceDaLista, fotoEstadoNovo);

        return novaLista;
    }

    if(action.type === 'LIKE'){
        const fotoAchada = state.find(foto => foto.id === action.fotoId);
        fotoAchada.likeada = !fotoAchada.likeada;

        const liker = action.liker;
        const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);
        if(possivelLiker === undefined){
            fotoAchada.likers.push(liker);
        }else{
            const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
            fotoAchada.likers = novosLikers;
       }

       return state;
    }
    return state;
}
