import * as THREE from 'three';
import * as SimplexNoise from 'simplex-noise';

function create2DArray(size) {
    return Array(size).fill(true).map(() => Array(size));
}

export class Grid {

    init(): THREE.Object3D[] {
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const size = 100;
        const pointX: THREE.Vector3[][] = create2DArray(size);
        const pointY: THREE.Vector3[][] = create2DArray(size);
        const simplex = new SimplexNoise(Math.random);
        function noiseLevel(x, y, l) {
            return simplex.noise2D(x / l, y / l) * l;
        }

        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const z1 = noiseLevel(x, y, 50);
                const z2 = noiseLevel(x, y, 10);
                const z3 = noiseLevel(x, y, 3);
                const z = Math.max((z1 + z2 + z3) / 5, 0);
                const p = new THREE.Vector3(x - size / 2, z, y - size / 2);
                pointX[x][y] = p;
                pointY[y][x] = p;
            }
        }

        function toLine(points: THREE.Vector3[]): THREE.Object3D {
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            return new THREE.Line(geometry, material);
        }

        const lines: THREE.Object3D[] = [
            ...pointX.map(toLine),
            ...pointY.map(toLine)
        ];

        return lines;
    }
}