import Image from 'next/image'
import {
  Layout,
  Text,
  Page,
  Code,
  Link,
  List,
  Snippet,
} from '@vercel/examples-ui'

import Card from '../components/Card'

import screenshot1 from '../public/docs/screenshot-1a.png'
import screenshot2 from '../public/docs/screenshot-2a.png'
import screenshot3 from '../public/docs/screenshot-3a.png'

const CARD = {
  id: '617a8bb9637d9400182bd6fe',
  title: 'Next.js image example',
  thumbnail: '/logo.jpg',
}

function Home() {
  return (
    <Page>
      <Text variant="h1" className="mb-6">
        Reduce next/image bandwidth usage
      </Text>
      <Text className="mb-4">
        This example shows how to reduce bandwidth and processing costs when
        using different layouts.
      </Text>
      <Text variant="h2" className="mb-4 mt-10">
        Using <Code>layout=&quot;fill&quot;</Code> or{' '}
        <Code>layout=&quot;responsive&quot;</Code>
      </Text>
      <Text className="mb-4">
        Using{' '}
        <Link href="https://nextjs.org/docs/api-reference/next/image#layout">
          <Code>layout=fill</Code>
        </Link>{' '}
        in <Code>next/image</Code> is one of the most common patterns as it let
        us use responsive parents and (along with the{' '}
        <Link href="https://nextjs.org/docs/api-reference/next/image#objectfit">
          <Code>objectFit</Code>
        </Link>{' '}
        prop) our images will resize to it perfectly. But this leads to a common
        problem; as we don&apos;t know how large our parent might be, we
        can&apos;t serve an optimized image.
      </Text>
      <section className="flex flex-col gap-4">
        <Text>
          For example, the following card has an image with{' '}
          <Code>layout=fill</Code>:
        </Text>
        <Card>
          <Image layout="fill" src={CARD.thumbnail} alt={CARD.title} />
        </Card>
        <Text>And is represented by this code:</Text>
        <Snippet>
          {`<Card>
  <Image layout="fill" src="..." />
</Card>`}
        </Snippet>
        <Text>
          Everything looks okay but our image has a width of 256px and we are
          serving a 1000px image!
        </Text>
        <Image
          src={screenshot1}
          alt="Image size when using layout fill or responsive is large"
        />
        <Text>
          To serve optimized images we need to use the{' '}
          <Link href="https://nextjs.org/docs/api-reference/next/image#sizes">
            <Code>sizes</Code>
          </Link>{' '}
          prop, which provides information about how wide the image will be at
          different breakpoints when using{' '}
          <Code>layout=&quot;responsive&quot;</Code> or{' '}
          <Code>layout=&quot;fill&quot;</Code>. In this case our card limits the
          width of the image to a maximum of <Code>256px</Code>. So if we update
          our code and set <Code>sizes</Code> to <Code>256px</Code> it should
          give us a smaller image:
        </Text>
        <Card>
          <Image
            sizes="256px"
            layout="fill"
            src={CARD.thumbnail}
            alt={CARD.title}
          />
        </Card>
        <Snippet>
          {`<Card>
  <Image layout="fill" sizes="256px" src="..." />
</Card>`}
        </Snippet>
        <Image
          src={screenshot2}
          alt="Image using sizes to reduce its maximum size when using layout fill or responsive"
        />
        <Text>Now we are being served with an optimized image.</Text>
        <Text>
          We also have a lot of images available for different viewport sizes
          that will be generated (and cached) on demand just when needed. By
          default, a variant will be available for every{' '}
          <Link href="https://nextjs.org/docs/api-reference/next/image#device-sizes">
            <Code>device size</Code>
          </Link>{' '}
          configured. But we can also specify{' '}
          <Link href="https://nextjs.org/docs/api-reference/next/image#image-sizes">
            <Code>image sizes</Code>
          </Link>{' '}
          that will be concatenated to the variants generated by device sizes
          when using <Code>layout=&quot;responsive&quot;</Code> or{' '}
          <Code>layout=&quot;fill&quot;</Code>.
        </Text>
      </section>
      <Text variant="h2" className="mt-10 mb-4">
        Using <Code>layout=&quot;fixed&quot;</Code> or{' '}
        <Code>layout=&quot;intrinsic&quot;</Code>
      </Text>
      <section className="flex flex-col gap-3">
        <Text>
          These layout values require the <Code>width</Code> and{' '}
          <Code>height</Code> of the image to be defined. The image will then
          include the variant that better matches its size and a bigger variant
          for high DPR screens (more about DPR in the next section).
        </Text>
        <Card>
          <Image
            width={256}
            height={256}
            src={CARD.thumbnail}
            alt={CARD.title}
          />
        </Card>
        <Snippet>
          {`<Card>
  <Image src="..." width={256} height={256} />
</Card>`}
        </Snippet>
        <Text>
          Note: <Code>intrinsic</Code> is the default layout so we don&apos;t
          have to define it.
        </Text>
        <Image
          src={screenshot2}
          alt="Image with a fixed layout with known width and height"
        />
      </section>
      <Text variant="h2" className="mb-4 mt-10">
        How the browser decides which variant to use
      </Text>
      <Text className="mb-4">
        A variant is one of the image sources (a URL with a descriptor) being
        added to the{' '}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset">
          <Code>srcset</Code>
        </Link>{' '}
        attribute, which is one of the things next/image does under the hood.
        The browser decides what variant to use based on the following factors:
      </Text>
      <List>
        <li className="mb-2">
          If the image has <Code>width</Code> and <Code>height</Code>, the
          browser picks the <Code>srcset</Code> that matches the DPR (Device
          Pixel Ratio) of the screen, and the descriptor part of the{' '}
          <Code>srcset</Code> indicates the pixel density.
        </li>
        <li>
          <span>
            If the image has <Code>sizes</Code> set, the browser picks the{' '}
            <Code>srcset</Code> whose width descriptor matches the width
            indicated by <Code>sizes</Code>, and for high DPR screens it will
            pick a higher size. For example, for a full hd display in a common
            size (DPR of ~1), our 256w image will use the 256w variant, for a
            retina display with a DPR of ~2, the browser will pick the 640w
            variant instead:
          </span>
          <Image
            src={screenshot3}
            alt="Image using sizes to reduce its maximum size when using layout fill or responsive"
          />
        </li>
      </List>
    </Page>
  )
}

Home.Layout = Layout

export default Home
