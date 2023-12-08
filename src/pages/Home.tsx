import { useEffect, useState } from "react";
import { Domain } from "@atala/prism-wallet-sdk";
import { useAgent } from "../services/AgentConnect"
import { apollo, castor, createDID } from "../services/DID";

function Home(): JSX.Element {
    const { state } = useAgent();
    const [mnemonics, setMnemonics] = useState<string[]>([]);
    const [did, setDID] = useState<Domain.DID>()

    const exampleService = new Domain.Service("didcomm", ["DIDCommMessaging"], {
        uri: "https://example.com/endpoint",
        accept: ["didcomm/v2"],
        routingKeys: ["did:example:somemediator#somekey"],
      });

    const onClickDID = async () => {
        const mn = apollo.createRandomMnemonics()
        setMnemonics(mn)
        const d = await createDID(mn, [exampleService])
        setDID(d)
        localStorage.setItem('did', d.toString())
    }

    useEffect(()=> {
        const d = localStorage.getItem('did')
        if (d) {
            castor.resolveDID(d).then(r => setDID(r.id))
        }
    }, [])

    return (
        <>
            <h1>Homeee</h1>
            <h2>Agent state: <span>{state}</span></h2>
            <h5>
                {mnemonics.join(' ')}
            </h5>
            <p>{did?.toString()}</p>
            <button onClick={onClickDID}>
                Create Account
            </button>
        </>
    )
}

export default Home