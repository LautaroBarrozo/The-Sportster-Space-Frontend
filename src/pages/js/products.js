import camperaHonda from '../imgs/products/camperas/campera_honda_racing.jpg'
import camperaHarley from '../imgs/products/camperas/Campera_De_Cuero_Harley_Davidson.jpg'
import camperaCuero from '../imgs/products/camperas/camperas_de_cuero.jpg'
import pantalonJean from '../imgs/products/pantalones/pantalones_moto_jeans_kevlar.jpg'
import pantalonMotocross from '../imgs/products/pantalones/pantalones_motocross.jpg'
import pantalonCuero from '../imgs/products/pantalones/pantalon_de_cuero.jpg'
import botasTurismo from '../imgs/products/calzado/Botas_De_Motociclismo.jpg'
import botasMotocross from '../imgs/products/calzado/botas_de_motocross_fox.jpg'
import botasBomber from '../imgs/products/calzado/fox_bomber_boots.jpg'
import cascoMotocross from '../imgs/products/cascos/casco_de_motocross.jpg'
import cascoAbierto from '../imgs/products/cascos/casco_de_moto_abierto.jpg'
import cascoHawk from '../imgs/products/cascos/casco_hawk_rs1_4.jpg'
import proteccionesCoderas from '../imgs/products/protecciones/coderas.jpg'
import proteccionesRodilleras from '../imgs/products/protecciones/rodilleras.jpg'
import proteccionesArmor from '../imgs/products/protecciones/pechera.jpg'
import guantesInvierno from '../imgs/products/guantes/guantes_moto_invierno.jpg'
import guantesVerano from '../imgs/products/guantes/Guantes_medio_dedo.jpg'
import guantesHarley from '../imgs/products/guantes/guantes_harley_davidson.jpg'

export const products = [

    { id: 1, name: "Campera Honda Racing", price: 20300, origin: "Japon", color: "Blanco, naranja y negro", material: "Neoprene", image: camperaHonda, description: "campera honda racing original", category: "camperas", popular: true },
    { id: 2, name: "Campera Harley Davidson", price: 130000, origin: "Estados Unidos", color: "Negro", material: "Cuero", image: camperaHarley, description: "campera harley davidson de cuero", category: "camperas", popular: true },
    { id: 3, name: "Campera de cuero", price: 29900, origin: "Argentina", color: "Negro, marron o celeste", material: "Cuero", image: camperaCuero, description: "campera de cuero para motociclismo", category: "camperas", popular: false },

    { id: 4, name: "Jean con protecciones", price: 20700, origin: "Argentina", color: "Azul", material: "Jean y kevlar", image: pantalonJean, description: "Jeans con protecciones de kevlar", category: "pantalones", popular: true },
    { id: 5, name: "Pantalon para motocross", price: 13500, origin: "Argentina", color: "Azul, negro y rosa ", material: "Nylon", image: pantalonMotocross, description: "Pantalones para motocross yamaha", category: "pantalones", popular: false },
    { id: 6, name: "Pantalon de cuero", price: 30580, origin: "Estados Unidos", color: "Negro", material: "Cuero", image: pantalonCuero, description: "Pantalon de cuero con protecciones", category: "pantalones", popular: true },

    { id: 7, name: "Botas de turismo", price: 90000, origin: "Estados Unidos", color: "Negro", material: "Cuero", image: botasTurismo, description: "Botas de cuero tipo turismo", category: "calzado", popular: false },
    { id: 8, name: "Botas fox de motocross", price: 120000, origin: "Estados Unidos", color: "Negro", material: "Cuero y goma", image: botasMotocross, description: "Botas para motocross marca Fox ", category: "calzado", popular: true },
    { id: 9, name: "Botas bomber fox", price: 87000, origin: "Estados Unidos", color: "Negro", material: "cuero", image: botasBomber, description: "Botas Fox tipo bomber", category: "calzado", popular: true },

    { id: 10, name: "Casco de motocross", price: 67900, origin: "Estados Unidos", color: "Negro y blanco", material: "Fibra de carbono y kevlar", image: cascoMotocross, description: "Casco de motocross Fox", category: "cascos", popular: true },
    { id: 11, name: "Casco abierto", price: 23000, origin: "Argentina", color: "Blanco y rojo", material: "Fibra de carbono y kevlar", image: cascoAbierto, description: "Casco para moto tipo abierto", category: "cascos", popular: false },
    { id: 12, name: "Casco hawk rs1", price: 21500, origin: "Argentina", color: "Blanco y violeta", material: "Fibra de carbono y kevlar", image: cascoHawk, description: "Casco hawk rs1 completo", category: "cascos", popular: true },

    { id: 13, name: "Coderas", price: 5600, origin: "Argentina", color: "Negro", material: "Fibra de carbono", image: proteccionesCoderas, description: "Coderas de fibra de carbono", category: "protecciones", popular: true },
    { id: 14, name: "Rodilleras", price: 9500, origin: "Argentina", color: "Negro", material: "Fibra de carbono", image: proteccionesRodilleras, description: "Rodilleras de fibra de carbono", category: "protecciones", popular: false },
    { id: 15, name: "Pro biker body armor", price: 20500, origin: "Argentina", color: "Negro", material: "Fibra de carbono", image: proteccionesArmor, description: "Body armor de fibra de carbono", category: "protecciones", popular: true },

    { id: 16, name: "Guantes para invierno", price: 8200, origin: "Argentina", color: "Negro", material: "Fibra de carbono y kevlar", image: guantesInvierno, description: "Guantes para invierno con proteccion ", category: "guantes", popular: true },
    { id: 17, name: "Guantes para verano", price: 10200, origin: "Argentina", color: "Negro", material: "Fibra de carbono y kevlar", image: guantesVerano, description: "Guantes para verano con proteccion", category: "guantes", popular: false },
    { id: 18, name: "Guantes harley davidson", price: 20000, origin: "Estados Unidos", color: "Negro", material: "Cuero y kevlar", image: guantesHarley, description: "Guantes harley davidson de cuero", category: "guantes", popular: true }
]