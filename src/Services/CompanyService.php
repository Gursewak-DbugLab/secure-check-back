<?php

namespace App\Services;

use App\Entity\Company;
use App\Entity\CompanyType;
use App\Repository\CompanyRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

class CompanyService extends AbstractController
{
    private $entityManager;
    private $validator;
    private $resourceName = 'Entreprise';

    public function __construct(
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
        private SluggerInterface $slugger,
        private CompanyRepository $companyRepository

    ) {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    public function add($data)
    {
        $company = new Company();
        $company->setName(name: $data['name'])
            ->setDescription($data["description"])
            ->generateSlug($this->slugger)
            ->setCreatedAt(new DateTimeImmutable())
        ;

        $errors = $this->validator->validate($company);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }

            return new JsonResponse([
                'errors' => $errorMessages
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $this->entityManager->persist($company);
        $this->entityManager->flush();

        return $this->json(
            [
                'message' => 'Création effectuée',
                'data' => $company
            ],
            Response::HTTP_OK
        );
    }

    public function show($slug)
    {
        $company = $this->companyRepository->findOneBy(['slug' => $slug]);

        if (!$company) {
            return new JsonResponse([
                'message' => "$this->resourceName introuvable"
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->json([
            "message" => "Entreprise",
            "data" => $company
        ], 200);
    }

    public function update($data, $company)
    {
        if (!$company) {
            return new JsonResponse([
                'message' => "$this->resourceName introuvable"
            ], Response::HTTP_NOT_FOUND);
        }

        $company->setName($data['name'])->setDescription($data['description']);
        $company->generateSlug($data['name']);

        $this->entityManager->flush();

        return new JsonResponse([
            'message' => 'Mise à jour effectuée',
            'data' => $company
        ], Response::HTTP_OK);
    }

    public function delete($company)
    {
        if (!$company) {
            return new JsonResponse([
                'message' => "$this->resourceName introuvable"
            ], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($company);
        $this->entityManager->flush();

        return $this->json([
            'message' => 'Suppression effectuée'
        ], Response::HTTP_NO_CONTENT);
    }

    public function all()
    {
        $companies = $this->entityManager->getRepository(Company::class)->findBy([], ['createdAt' => 'DESC']);

        return $this->json(
            [
                'data' => $companies
            ],
            Response::HTTP_OK,
            [],
            ["groups" => 'company']
        );
    }
}