export function listagem(fotos){
    return {type : 'LISTAGEM', fotos : fotos};
}

export function comentario(fotoId, novoComentario){
    return { type : 'COMENTARIO', fotoId : fotoId, novoComentario : novoComentario };
}

export function like(fotoId, liker){
    return { type : 'LIKE', fotoId : fotoId, liker : liker };
}

export function notificacao(msg){
    return { type : 'ALERT', msg};
}
