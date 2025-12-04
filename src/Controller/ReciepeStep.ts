

class ReciepeStep {

    reciepeId: number;
    stepId: number;
    order: number;

    constructor(reciepeId: number, stepId: number, order: number) {
        this.reciepeId = reciepeId;
        this.stepId = stepId;
        this.order = order;
    }

}

export default ReciepeStep;