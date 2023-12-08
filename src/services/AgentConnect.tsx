import { useState, useEffect } from "react";
import  {Agent, Domain, ListenerKey, Apollo} from "@atala/prism-wallet-sdk";
import { PlutoInMemory } from "../pluto";

const defaultMediatorDID = 'did:peer:2.Ez6LSghwSE437wnDE1pt3X6hVDUQzSjsHzinpX3XFvMjRAm7y.Vz6Mkhh1e5CEYYq6JBUcTZ6Cp2ranCWRrv7Yax3Le4N59R6dd.SeyJ0IjoiZG0iLCJzIjoiaHR0cHM6Ly9zaXQtcHJpc20tbWVkaWF0b3IuYXRhbGFwcmlzbS5pbyIsInIiOltdLCJhIjpbImRpZGNvbW0vdjIiXX0.SeyJ0IjoiZG0iLCJzIjoid3NzOi8vc2l0LXByaXNtLW1lZGlhdG9yLmF0YWxhcHJpc20uaW8vd3MiLCJyIjpbXSwiYSI6WyJkaWRjb21tL3YyIl19';

const pluto = new PlutoInMemory();


export function useAgent() {
    const mediatorDID = Domain.DID.fromString(defaultMediatorDID);
    const [agent, setAgent] = useState<Agent|null>(null);  
    const [state, setState] = useState<string>('offline');
    const [error, setError] = useState<Error>();

    useEffect(() => {
        const a = Agent.initialize({ mediatorDID, pluto });
        a.start()
            .then(st => setState(st))
            .catch(err => setError(err))
        setAgent(a);

    }, [])   

    return {agent, state, error}
}


 