import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import close from '../assets/close.svg';

const Home = ({ home, provider, account, escrow, togglePop }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasBought, setHasBought] = useState(false);
  const [hasLended, setHasLended] = useState(false);
  const [hasInspected, setHasInspected] = useState(false);
  const [hasSold, setHasSold] = useState(false);

  const [buyer, setBuyer] = useState(null);
  const [lender, setLender] = useState(null);
  const [inspector, setInspector] = useState(null);
  const [seller, setSeller] = useState(null);

  const [owner, setOwner] = useState(null);

  const fetchDetails = async () => {
    // -- Buyer

    const buyer = await escrow.buyer(home.id);
    setBuyer(buyer);
    // console.log('from fetch details, the buyer is', buyer);

    const hasBought = await escrow.approval(home.id, buyer);
    setHasBought(hasBought);

    // -- Seller

    const seller = await escrow.seller(); // becuase in our esscrow  owner changed to seller
    setSeller(seller);
    // console.log('from fetch details, the seller is', seller);

    const hasSold = await escrow.approval(home.id, seller);
    setHasSold(hasSold);

    // -- Lender

    const lender = await escrow.lender();
    setLender(lender);
    // console.log('from fetch details, the lender is', lender);

    const hasLended = await escrow.approval(home.id, lender);
    setHasLended(hasLended);

    // -- Inspector

    const inspector = await escrow.inspector();
    setInspector(inspector);
    // console.log('from fetch details, the inspector is', inspector);

    const hasInspected = await escrow.inspectionPassed(home.id);
    setHasInspected(hasInspected);

    // console.log('setIsloading will now be set to false');
    // console.log(
    //   'seller,lender and inspector after async await is: ',
    //   seller,
    //   lender,
    //   inspector
    // );
    // setIsLoading(false); // Set loading to false after fetching data
  };

  //fetchowner is not working
  const fetchOwner = async () => {
    if (await escrow.isPropertyListed(home.id)) return;

    const owner = await escrow.buyer(home.id);
    console.log('from fetch owner', owner);
    setOwner(owner);
  };

  const buyHandler = async () => {
    const escrowAmount = await escrow.escrowAmount(home.id);
    console.log('THe home id is', home.id);
    console.log('the esscrowAmount is', escrowAmount);
    const signer = await provider.getSigner();

    // Buyer deposit earnest
    let transaction = await escrow
      .connect(signer)
      .depositEscrow(home.id, { value: escrowAmount });
    console.log('the transaction in buyHandler is', transaction);
    await transaction.wait();

    // Buyer approves...
    transaction = await escrow.connect(signer).approvePropertySale(home.id);
    await transaction.wait();

    setHasBought(true);
  };

  const inspectHandler = async () => {
    const signer = await provider.getSigner();

    // Inspector updates status
    const transaction = await escrow
      .connect(signer)
      .updateInspection(home.id, true);
    await transaction.wait();

    setHasInspected(true);
  };

  const lendHandler = async () => {
    const signer = await provider.getSigner();
    console.log('Escrow address:', escrow.getAddress());

    // Lender approves...
    const transaction = await escrow
      .connect(signer)
      .approvePropertySale(home.id);
    await transaction.wait();

    // Lender sends funds to contract...
    const lendAmount =
      (await escrow.propertyPrice(home.id)) -
      (await escrow.escrowAmount(home.id));
    await signer.sendTransaction({
      to: escrow.getAddress(),
      value: lendAmount.toString(),
      gasLimit: 60000,
    });
    console.log(' lended has been successfull. Now has Lended is true');
    setHasLended(true);
  };

  const sellHandler = async () => {
    console.log('sell handler has been set to true');
    const signer = await provider.getSigner();

    // Seller approves...
    let transaction = await escrow.connect(signer).approvePropertySale(home.id);
    await transaction.wait();
    console.log('Seller has approved property sale');

    // Seller finalize...
    transaction = await escrow.connect(signer).finalizePropertySale(home.id);
    await transaction.wait();
    console.log(
      'Seller has finalized property sale/ Now has sold will be set to true'
    );

    setHasSold(true);
  };

  useEffect(() => {
    fetchDetails();
    fetchOwner();
  }, [hasSold]);
  useEffect(() => {
    if (buyer && lender && inspector && seller) {
      setIsLoading(false); // Set loading to false if all values are set
      console.log('setIsloading will now be set to false');
      console.log(
        'seller,lender and inspector after use Effect is: ',
        seller,
        lender,
        inspector
      );
    }
  }, [buyer, lender, inspector, seller]);

  return (
    <>
      <div className="home">
        {isLoading ? (
          <div className="home__details">
            <div className="home__image">
              <ReactLoading type="spin" color="black" height={60} width={60} />
            </div>
            <button onClick={togglePop} className="home__close">
              <img src={close} alt="Close" />
            </button>
          </div>
        ) : (
          <div className="home__details">
            <div className="home__image">
              <img src={home.image} alt="Home" />
            </div>
            <div className="home__overview">
              <h1>{home.name}</h1>
              <p>
                <strong>{home.attributes[2].value}</strong> bds |
                <strong>{home.attributes[3].value}</strong> ba |
                <strong>{home.attributes[4].value}</strong> sqft
              </p>
              <p>{home.address}</p>

              <h2>{home.attributes[0].value} ETH</h2>
              {/* {console.log('owner is ', owner)}
              {console.log('  from home the account is ', account)} */}

              {owner ? (
                <div className="home__owned">
                  Owned by {owner.slice(0, 6) + '...' + owner.slice(38, 42)}
                </div>
              ) : (
                <div>
                  {/* {console.log('Inside ternary operators')}
                  {console.log('Selected account:', account)}
                  {console.log('Inspector:', inspector)}
                  {console.log('Lender:', lender)}
                  {console.log('Seller:', seller)}
                  {console.log('to string bata check')}
                  {console.log(account.toLowerCase() === lender.toLowerCase())} */}
                  {account.toLowerCase() === inspector.toLowerCase() ? (
                    <button
                      className="home__buy"
                      onClick={inspectHandler}
                      disabled={hasInspected}
                    >
                      Approve Inspection
                    </button>
                  ) : account.toLowerCase() === lender.toLowerCase() ? (
                    <button
                      className="home__buy"
                      onClick={lendHandler}
                      disabled={hasLended}
                    >
                      Approve & Lend
                    </button>
                  ) : account.toLowerCase() === seller.toLowerCase() ? (
                    <button
                      className="home__buy"
                      onClick={sellHandler}
                      disabled={hasSold}
                    >
                      Approve & Sell
                    </button>
                  ) : (
                    <button
                      className="home__buy"
                      onClick={buyHandler}
                      disabled={hasBought}
                    >
                      Buy
                    </button>
                  )}

                  <button className="home__contact">Contact agent</button>
                </div>
              )}

              <hr />

              <h2>Overview</h2>

              <p>{home.description}</p>

              <hr />

              <h2>Facts and features</h2>

              <ul>
                {home.attributes.map((attribute, index) => (
                  <li key={index}>
                    <strong>{attribute.trait_type}</strong> : {attribute.value}
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={togglePop} className="home__close">
              <img src={close} alt="Close" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
