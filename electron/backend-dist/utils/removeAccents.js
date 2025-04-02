"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quitarTildes = quitarTildes;
function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
