import {Pipeline} from "../../../core";
import {StartSpinNode} from "./StartSpinNode";

export interface BeginSpinPipeLineConfig
{

}

/**
 * todo
 * I think generating the 'spin result' pipeline should most likey be done
 * in the parsing of the commands registering pipes given commands in the response data
 */
export class BeginSpinPipeLine extends Pipeline<BeginSpinPipeLineConfig>
{
    constructor(config: BeginSpinPipeLineConfig)
    {
        super(config);

        /**
         * todo
         * add in the registering of nodes
         * in the future this class most likely won't be needed and we can generate this from json files 
         * and registering nodes that way
         */
        this.registerNode(new StartSpinNode({}));
        this.registerNode(new StartSpinNode({}));
        this.registerNode(new StartSpinNode({}));
        this.registerNode(new StartSpinNode({}));
        this.registerNode(new StartSpinNode({}));
    }
}