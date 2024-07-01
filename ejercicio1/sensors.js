
/**
 * Resolucion ejercicio
 */
class Sensor {
    #updated_at;
    #value;

    constructor(id, nombre, type, value, unit, updated_at){
        this.id = id;
        this.nombre = nombre;
        this.type = type;
        this.#value = value || '';
        this.unit = unit;
        this.#updated_at = updated_at || '';
    }

    // getters & setters   
    get actualizacion(){
        return this.#updated_at
    }
    get valore(){
        return this.#value
    }
    
    set actualizacion(updateat){
        this.#updated_at = updateat
    }

    set valor(val){
        this.#value = val
    }

    updateValue(val) {
        const hoy = new Date();

        this.valor = val;
        this.actualizacion = hoy.toLocaleString();

        const seccion = document.querySelector('section')
        const elementoActualizado = document.createElement('div')
        elementoActualizado.className = 'column'
        elementoActualizado.innerHTML = `
        
            <h1>Sensor ID: ${this.id}</h1>
            <div class="content">
                <p><strong>Nuevo valor</strong>: ${this.valore}.</p>
                
                <p><strong>Fecha de actualizacion</strong>: ${this.actualizacion}.</p>
            </div>
`
        
        seccion.appendChild(elementoActualizado)
     
    }

}



class SensorManager {
    constructor() {
        this.sensors = [];
    }

    addSensor(sensor) {
        this.sensors.push(sensor);
    }

    updateSensor(id) {
        const sensor = this.sensors.find((sensor) => sensor.id === id);
        if (sensor) {
            let newValue;
            switch (sensor.type) {
                case "temperature": // Rango de -30 a 50 grados Celsius
                    newValue = (Math.random() * 80 - 30).toFixed(2);
                    break;
                case "humidity": // Rango de 0 a 100%
                    newValue = (Math.random() * 100).toFixed(2);
                    break;
                case "pressure": // Rango de 960 a 1040 hPa (hectopascales o milibares)
                    newValue = (Math.random() * 80 + 960).toFixed(2);
                    break;
                default: // Valor por defecto si el tipo es desconocido
                    newValue = (Math.random() * 100).toFixed(2);
            }
            sensor.updateValue(newValue);

        } else {
            console.error(`Sensor ID ${id} no encontrado`);
        }
    }

    async loadSensors(url) {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                
                for (let i = 0; i < data.length; i++) {
                    const sensor = new Sensor();
                    sensor.id = data[i].id
                    sensor.nombre = data[i].name
                    sensor.type = data[i].type
                    sensor.value = data[i].value
                    sensor.unit = data[i].unit
                    sensor.updated_at = data[i].updated_at
                    
                    this.addSensor(sensor);
                }
                this.render();
            })

    }


    render() {


        const container = document.getElementById("sensor-container");
        container.innerHTML = "";
        this.sensors.forEach((sensor) => {
            const sensorCard = document.createElement("div");
            sensorCard.className = "column is-one-third";
            sensorCard.innerHTML = `
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Sensor ID: ${sensor.id}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <p>
                                <strong>Tipo:</strong> ${sensor.type}
                            </p>
                            <p>
                               <strong>Valor:</strong> 
                               ${sensor.value} ${sensor.unit}
                            </p>
                        </div>
                        <time datetime="${sensor.updated_at}">
                            Última actualización: ${new Date(
                                sensor.updated_at
                            ).toLocaleString()}
                        </time>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item update-button" data-id="${
                            sensor.id
                        }">Actualizar</a>
                    </footer>
                </div>
            `;
            container.appendChild(sensorCard);
        });

        const updateButtons = document.querySelectorAll(".update-button");
        updateButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                const sensorId = parseInt(button.getAttribute("data-id"));
                this.updateSensor(sensorId);
            });
        });
    }
    

}

const monitor = new SensorManager();

monitor.loadSensors("sensors.json");
