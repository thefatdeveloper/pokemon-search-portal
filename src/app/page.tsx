import Link from "next/link";
import { Container } from "@/components/layout/common/Container";
import { Section } from "@/components/layout/common/Section";
import { Divider } from "@/components/layout/common/Divider";

export default function Home() {
  return (
    <>
      <Section background="primary" padding="lg" className="text-center">
        <Container>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to PokéSearch
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Your comprehensive Pokémon search portal. Explore, filter, and discover
            Pokémon from all generations with our advanced search tools.
          </p>
          <Link
            href="/search"
            className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          >
            Start Searching
          </Link>
        </Container>
      </Section>

      <Section padding="default">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Search by Name</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Easily find any Pokémon by typing its name, even just a part of it.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Filter by Type</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Discover Pokémon by their elemental types, from Fire to Psychic.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Detailed Information</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get comprehensive stats, abilities, and evolution data for any Pokémon.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      
      <Divider />

      <Section background="alternate" padding="default">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start your Pokémon journey with our powerful search tools and comprehensive database.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/search"
              className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
            >
              Go to Search
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}