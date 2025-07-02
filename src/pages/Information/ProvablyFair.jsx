import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import Layout from "../../components/Layout/Layout";
import PFENG from "./ProvablyFairData/PFENG";
import { useTranslation } from "react-i18next";
import PFEST from "./ProvablyFairData/PFEST";
import PFRUS from "./ProvablyFairData/PFRUS";

const ProvablyFair = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const code = `import crypto from 'crypto';

/**
 * Verifies the result index based on a provably fair system using seeds and nonce.
 *
 * @param {string} serverSeed - The server-generated seed.
 * @param {string} clientSeed - The client-provided seed.
 * @param {number} nonce - The play count or round number.
 * @param {number} productsLength - Total number of products to choose from.
 * @returns {number} - The index of the selected product.
 */

const serverSeed = '3b79a56f040e384220d5d8c17834b017e9f9da348f3bfb7cd86d4644bb61ad8d';
const clientSeed = 'f054ef22bef543fb7bd392419bea3727ed297e9820d72335c68de209c08149c9';
const nounce = 1611;
const productsLength = 3;


export const verifyResult = (
  serverSeed: string,
  clientSeed: string,
  nonce: number,
  productsLength: number
): number => {
  const combinedSeed ={serverSeed}:{clientSeed}:{nonce};
  const hash = crypto.createHash('sha256').update(combinedSeed).digest('hex');
  const subHash = hash.substring(0, 8); // Use first 8 hex chars
  const value = parseInt(subHash, 16);
  return value % productsLength;
};

`;

  const { i18n, t } = useTranslation();

  return (
    <Layout>
      <div className="layout-padding  information-page">
        {i18n.language === "en" ? (
          <PFENG />
        ) : i18n.language === "est" ? (
          <PFEST />
        ) : (
          <PFRUS />
        )}

        <pre>
          <code className="language-javascript">{code}</code>
        </pre>

        <p>{t("PF.p")}</p>
      </div>
    </Layout>
  );
};

export default ProvablyFair;
